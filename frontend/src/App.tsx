import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import ResultData from "./components/Result/resultData";
import type { ResultDataProps } from "./components/Result/diagnosis";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState<ResultDataProps | null>(null);

  async function runAgent() {
    const res = await fetch("http://localhost:3001/agent-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language }),
    });
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();
      if (done) {
        console.log("done");
        break;
      }

      const chunk = decoder.decode(value);
      const json = JSON.parse(chunk.replace("data: ", "")) as ResultDataProps;
      setResult(json);
      console.log(result);
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
      {result && (
        <ResultData
          diagnosis={result?.diagnosis}
          improvements={result?.improvements}
          refactoredCode={result?.refactoredCode}
          futureSuggestions={result?.futureSuggestions}
        />
      )}
    </div>
  );
}

export default App;
