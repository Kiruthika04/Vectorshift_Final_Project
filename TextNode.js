// TextNode.js
import React, { useEffect, useState, useRef } from "react";
import { Handle, Position } from "reactflow";

const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);
  const textRef = useRef(null);
  const [size, setSize] = useState({ width: 200, height: 100 });
  const [errors, setErrors] = useState([]);

  // -----------------------------
  // 1. Extract {{ variables }} from text
  // -----------------------------
  const extractVariables = (value) => {
    const regex = /{{\s*([^}]+)\s*}}/g;
    const found = new Set();
    const validationErrors = [];

    let match;
    while ((match = regex.exec(value)) !== null) {
      const variable = match[1].trim();

      // Check JS variable validity
      const validName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(variable);

      if (!validName) {
        validationErrors.push(`Invalid variable name: "${variable}"`);
      } else {
        if (found.has(variable)) {
          validationErrors.push(`Duplicate variable: "${variable}"`);
        }
        found.add(variable);
      }
    }

    setErrors(validationErrors);
    setVariables([...found]);
  };


  // -----------------------------
  // 2. Auto-resize node based on text
  // -----------------------------
  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const newHeight = element.scrollHeight + 40;
      const newWidth = Math.min(
        Math.max(200, element.scrollWidth + 40),
        400 // max width
      );

      setSize({ width: newWidth, height: newHeight });
    }
  }, [text]);

  // Update variables whenever text changes
  useEffect(() => {
    extractVariables(text);
  }, [text]);

  // ----------------------------------------------------
  // 3. Sync data to parent (React Flow state)
  // ----------------------------------------------------
  useEffect(() => {
    if (data?.onChange) {
      data.onChange({
        text,
        variables,
        errors,
        nodeId: id,
      });
    }
  }, [text, variables, errors, data, id]);

  return (
    <div
      style={{
        width: size.width,
        height: size.height,
        border: "1px solid #555",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      {/* Title */}
      <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Text</div>

      {/* TEXTAREA */}
      <textarea
        ref={textRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: "100%",
          resize: "none",
          border: "none",
          outline: "none",
          overflow: "hidden",
          background: "transparent",
        }}
      />

      {/* ERROR MESSAGES */}
      {errors.length > 0 && (
        <div
          style={{
            color: "red",
            fontSize: "12px",
            marginTop: "5px",
            whiteSpace: "pre-wrap"
          }}
        >
          {errors.map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}


      {/* Dynamic Handles for variables */}
      {variables.map((v, index) => {
        const isInvalid = errors.some(err => err.includes(`"${v}"`));

        return (
          <Handle
            key={v}
            type="target"
            position={Position.Left}
            id={`${id}-var-${v}`}
            style={{
              top: 40 + index * 25,
              left: -8,
              background: isInvalid ? "red" : "#555",
              width: 10,
              height: 10,
              borderRadius: "50%",
            }}
          />
        );
      })}


      {/* Output handle */}
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
};

export default TextNode;
