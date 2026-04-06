import Editor from "@monaco-editor/react";
import { useState } from "react";
import styles from "./styles.module.css";
import { Copy } from "lucide-react";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  languageOptions: string[];
  onLanguageChange?: (lang: string) => void;
  readOnly?: boolean;
};

export default function CodeEditor({
  value,
  onChange,
  placeholder = "Escreva seu código aqui",
  height = "400px",
  languageOptions,
  onLanguageChange,
  readOnly=false
}: CodeEditorProps) {
  const [language, setLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);

  function languageChanged(language: string): void {
    if (!language) {
      return;
    }
    setLanguage(language);
    onLanguageChange(language);
  }

  async function handleCopy() {
  await navigator.clipboard.writeText(value);
  setCopied(true);

  setTimeout(() => setCopied(false), 2000);
}

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <select
          disabled={readOnly}
          className={styles.selectLanguage}
          onChange={(e) => languageChanged(e.target.value)}
        >
          {languageOptions?.map((languageOpt) => (
            <option value={languageOpt} key={languageOpt}>
              {languageOpt.toUpperCase()}
            </option>
          ))}
        </select>
        <button 
          className={styles.copyButton}
          onClick={handleCopy}
        > <Copy size={12}/> {copied ? "Copied!" : "Copy"} </button>
      </div>
      <div className={styles.editorWrapper}>
        {!value && <div className={styles.placeholder}>{placeholder}</div>}

        <Editor
          height={height}
          language={language}
          value={value}
          onChange={(val) => onChange(val || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            readOnly: readOnly
          }}
        />
      </div>
    </div>
  );
}
