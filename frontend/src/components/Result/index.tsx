import Editor from "@monaco-editor/react";
import { useState } from "react";
import "./styles.css";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  languageOptions: string[];
  onLanguageChange?: (lang: string) => void;
};

export default function Diagnosis({
  value,
  onChange,
  placeholder = "Escreva seu código aqui",
  height = "400px",
  languageOptions,
  onLanguageChange,
}: CodeEditorProps) {
  const [language, setLanguage] = useState("javascript");

  function languageChanged(language: string): void {
    if (!language) {
      return;
    }
    setLanguage(language);
    onLanguageChange(language)
  }

  return (
    <div className="main-container">
      <div className="editor-wrapper">
        {!value && <div className="placeholder">{placeholder}</div>}

        <Editor
          height={height}
          language={language}
          value={value}
          onChange={(val) => onChange(val || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>

      <select
        className="select-language"
        onChange={(e) => languageChanged(e.target.value)}
      >
        {languageOptions?.map((languageOpt) => (
          <option value={languageOpt} key={languageOpt}>
            {languageOpt.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
