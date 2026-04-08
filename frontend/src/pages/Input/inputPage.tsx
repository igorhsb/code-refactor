import styles from "./style.module.css";
import { useState } from "react";
import CodeEditor from "../../components/CodeEditor/codeEditor";
import type { ResultDataProps } from "../Result/diagnosis";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { Atom } from "lucide-react";

export default function InputPage() {
  const navigate = useNavigate();
  const [localCode, setLocalCode] = useState("");
  const [localLanguage, setLocalLanguage] = useState("javascript");
  const { setCode, setLanguage, setResult } = useAppContext();

  async function runAgent() {
    const res = await fetch("http://localhost:3001/agent-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ localCode, localLanguage }),
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
      handleGoToResult();
    }
  }

  function languageHasChanged(localLanguage: string): void {
    if (!localLanguage) {
      return;
    }
    setLocalLanguage(localLanguage);
    setLanguage(localLanguage);
  }

  function codeHasChanged(localCode: string): void {
    if (!localCode) {
      return;
    }
    setLocalCode(localCode);
    setCode(localCode);
  }

  function handleGoToResult() {
    navigate("/result");
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Atom size={35} color="#5E8BF4" />
          <p><span>Code</span> <span className={styles.headerBlueTitle}>Analyzer</span></p>
        </div>
        <div className={styles.headerLinks}>
          <a>Sobre</a>
          <a>Contato</a>
        </div>
      </div>
      <div className={styles.container}>
      <CodeEditor
        value={localCode}
        onChange={codeHasChanged}
        onLanguageChange={languageHasChanged}
        placeholder="// digite seu código..."
        height="400px"
        languageOptions={["javascript", "typescript", "html", "css", "json"]}
        readOnly={false}
        type="input"
      />

      <br />
      <button className={styles.button} onClick={runAgent}>Analyze Code</button>
      </div>
      <div className={styles.footer}>

      </div>
    </div>
  );
}
