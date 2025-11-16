// FlowEditor.js
import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
} from "reactflow";

import "reactflow/dist/style.css";

import nodeTypes from "./NodeTypes";

const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: 200, y: 100 },
    data: { label: "Input Node" },
  }
];

const initialEdges = [];

const FlowEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
