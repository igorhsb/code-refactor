import { useState } from "react";
import CodeEditor from "./components/CodeEditor";

type DiagnosisData = {
  issue: string;
  impact: string;
  explanation: string;
}

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState("");
  const [diagnosis, setDiagnosis] = useState<DiagnosisData[]>([]);

  async function runAgent() {
    setResult("");

    const res = await fetch("http://localhost:3001/agent-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code, language })
    });
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();
      if (done) {
        console.log('done')
        break
      };

      const chunk = decoder.decode(value);
      const json = JSON.parse(chunk.replace("data: ", ""));

      const resDiagnosis = json.diagnosis;

      if (resDiagnosis?.length > 0) {
        resDiagnosis.forEach( (diag : DiagnosisData) => {
          setDiagnosis(prev => [...prev, diag]);
        });
      }

      console.log(diagnosis)
      setResult(json.refactored_code);
    }
  }

  return (
    <div className="main-window">
      <h1>Code refactor</h1>

      <CodeEditor 
        value={code}
        onChange={setCode}
        onLanguageChange={setLanguage}
        placeholder="// digite seu código..."
        height="400px"
        languageOptions={["javascript", "typescript", "html", "css", "json"]}
      />

      <br />
      <button onClick={runAgent}>Run</button>

      <h3>Result</h3>
      <pre>{result}</pre>
    </div>
  );
}

export default App;