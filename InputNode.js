// InputNode.js

import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="🟢 Input Node"
      color="#4a90e2"
      outputHandles={[{ id: 'value', position: Position.Right }]}
    >
      <label style={{ display: 'block', marginBottom: 6 }}>
        <span>Name:</span>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          style={{
            width: '100%',
            marginTop: 4,
            padding: 4,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
      </label>

      <label style={{ display: 'block' }}>
        <span>Type:</span>
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          style={{
            width: '100%',
            marginTop: 4,
            padding: 4,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};

export default InputNode;
