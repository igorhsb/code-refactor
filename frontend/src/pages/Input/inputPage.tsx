import styles from "./style.module.css";
import { useState } from "react";
import CodeEditor from "../../components/CodeEditor/codeEditor";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAgentStream } from "../../hooks/useAgentStream";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "../../hooks/useTranslation";
import PageHeader from "../../components/PageHeader/pageHeader";

export default function InputPage() {
  const navigate = useNavigate();
  const [localCode, setLocalCode] = useState("");
  const [localLanguage, setLocalLanguage] = useState("javascript");
  const { setCode, setLanguage, setResult } = useAppContext();
  const { execute, loading } = useAgentStream();
  const { userLanguage } = useLanguage();
  const t = useTranslation();

  async function runAgent() {
    setCode(localCode);
    setLanguage(localLanguage);

    let hasNavigated = false;

    await execute(localCode, localLanguage, userLanguage, (chunk) => {
      setResult(chunk);

      if (!hasNavigated) {
        navigate("/result");
        hasNavigated = true;
      }
    });
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

  return (
    <div className={styles.mainContainer}>
      <PageHeader/>
      <div className={styles.container}>
        <CodeEditor
          value={localCode}
          onChange={codeHasChanged}
          onLanguageChange={languageHasChanged}
          placeholder={t.input.placeholder}
          copyButtonLabel={t.input.copyButton}
          copiedButtonLabel={t.input.copiedButton}
          height="400px"
          languageOptions={["javascript", "typescript", "html", "css", "json"]}
          readOnly={false}
          type="input"
        />

        <br />
        <button className={styles.button} onClick={runAgent} disabled={loading}>
          {t.input.button}
        </button>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
