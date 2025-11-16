// NodeTypes.js

import InputNode from "./nodes/InputNode";
import OutputNode from "./nodes/OutputNode";
import LLMNode from "./nodes/LLMNode";
import TextNode from "./nodes/TextNode";

const nodeTypes = {
  input: InputNode,
  llm: LLMNode,
  output: OutputNode,
  text: TextNode,
};

export default nodeTypes;
