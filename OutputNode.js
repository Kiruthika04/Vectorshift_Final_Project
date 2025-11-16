// OutputNode.js

import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="🔵 Output Node"
      color="#7ed321"
      inputHandles={[{ id: 'value', position: Position.Left }]}
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
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          style={{
            width: '100%',
            marginTop: 4,
            padding: 4,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};

export default OutputNode;
