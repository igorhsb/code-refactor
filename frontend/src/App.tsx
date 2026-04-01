import { useState } from "react";
import CodeEditor from "./components/CodeEditor";

function App() {
  const [task, setTask] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [result, setResult] = useState("");

  async function runAgent() {
    setSteps([]);
    setResult("");

    const res = await fetch("http://localhost:3001/agent-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task })
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n\n");

      for (const line of lines) {
        if (line.startsWith("data:")) {
          const json = JSON.parse(line.replace("data: ", ""));

          if (json.type === "final") {
            setResult(json.value);
          } else {
            setSteps(prev => [...prev, `${json.type}: ${json.value}`]);
          }
        }
      }
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Code refactor</h1>

      <CodeEditor />
      
      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Ex: what is (10 + 5) + (3 * 2)"
        rows={4}
        style={{ width: "100%" }}
        className=""
      />

      <br />
      <button onClick={runAgent}>Run</button>

      <h3>Steps</h3>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 10,
          borderRadius: 8,
          minHeight: 200
        }}
      >
        {steps.join("\n\n")}
      </pre>

      <h3>Result</h3>
      <pre>{result}</pre>
    </div>
  );
}

export default App;