import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// escreva seu código aqui");

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="json">JSON</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>

      <Editor
        height="400px"
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
      />
    </div>
  );
}