// submit.js
export async function submitPipeline(nodes, edges) {
  try {
    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nodes,
        edges,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to reach backend");
    }

    const data = await response.json();

    alert(
      `Pipeline Analysis:\n\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? "Yes ✅" : "No ❌"}`
    );

    return data;
  } catch (err) {
    alert("Error: " + err.message);
  }
}
