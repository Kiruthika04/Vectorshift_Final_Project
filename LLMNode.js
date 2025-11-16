import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="🤖 LLM Node"
      color="#f39c12"
      inputHandles={[
        { id: 'system', position: Position.Left, top: '35%' },
        { id: 'prompt', position: Position.Left, top: '65%' },
      ]}
      outputHandles={[{ id: 'response', position: Position.Right }]}
    >
      <p style={{ margin: 0, textAlign: 'center' }}>
        Processes system + prompt text.
      </p>
    </BaseNode>
  );
};

export default LLMNode;
