// BaseNode.js

import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  color = '#555',
  children,
  inputHandles = [],
  outputHandles = [],
  width = 240,
}) => {
  return (
    <div
      style={{
        width,
        padding: 10,
        borderRadius: 10,
        border: `1.5px solid ${color}`,
        background: '#f5f5f5',
        fontFamily: 'sans-serif',
        fontSize: 12,
        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: color,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '6px 6px 0 0',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        {title}
      </div>

      {/* Body */}
      <div style={{ marginTop: 8 }}>{children}</div>

      {/* Input Handles */}
      {inputHandles.map((h) => (
        <Handle
          key={h.id}
          type="target"
          position={h.position || Position.Left}
          id={`${id}-${h.id}`}
          style={{
            top: h.top,
            background: color,
            width: 10,
            height: 10,
            borderRadius: '50%',
            border: '2px solid white',
          }}
        />
      ))}

      {/* Output Handles */}
      {outputHandles.map((h) => (
        <Handle
          key={h.id}
          type="source"
          position={h.position || Position.Right}
          id={`${id}-${h.id}`}
          style={{
            top: h.top,
            background: color,
            width: 10,
            height: 10,
            borderRadius: '50%',
            border: '2px solid white',
          }}
        />
      ))}
    </div>
  );
};
