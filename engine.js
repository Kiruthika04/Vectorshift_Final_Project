// engine.js

export function executeFlow(nodes, edges) {
  const nodeMap = {};
  const edgeMap = {};

  // Map nodes by ID
  nodes.forEach((node) => {
    nodeMap[node.id] = node;
    edgeMap[node.id] = [];
  });

  // Build edge connections
  edges.forEach((edge) => {
    const { source, target, targetHandle } = edge;

    // Extract variable name from target handle: `<textNodeId>-var-<variable>`
    let variableName = null;
    if (targetHandle && targetHandle.includes("-var-")) {
      variableName = targetHandle.split("-var-")[1];
    }

    edgeMap[target].push({
      from: source,
      variable: variableName,
    });
  });

  const results = {};

  // Helper to recursively evaluate nodes
  function evalNode(nodeId) {
    if (results[nodeId] !== undefined) return results[nodeId];

    const node = nodeMap[nodeId];
    const inputs = edgeMap[nodeId];

    let output;

    // -------------------------------
    // Input Node
    // -------------------------------
    if (node.type === "inputNode") {
      output = node.data?.inputValue || "";
    }

    // -------------------------------
    // Text Node
    // -------------------------------
    else if (node.type === "textNode") {
      let text = node.data.text || "";

      inputs.forEach(({ from, variable }) => {
        const value = evalNode(from);
        const pattern = new RegExp(`{{\\s*${variable}\\s*}}`, "g");
        text = text.replace(pattern, value);
      });

      output = text;
    }

    // -------------------------------
    // Output Node
    // -------------------------------
    else if (node.type === "outputNode") {
      const collected = {};
      inputs.forEach(({ from }) => {
        collected[from] = evalNode(from);
      });

      output = collected;
    }

    results[nodeId] = output;
    return output;
  }

  // Execute all output nodes
  const finalResult = {};
  nodes.forEach((node) => {
    if (node.type === "outputNode") {
      finalResult[node.id] = evalNode(node.id);
    }
  });

  return finalResult;
}
