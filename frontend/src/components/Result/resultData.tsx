import styles from "./style.module.css";
import type { ResultDataProps } from "./diagnosis";
import CodeEditor from "../CodeEditor/codeEditor";
import { TriangleAlert } from "lucide-react";

export default function ResultData({
  diagnosis = [],
  improvements = [],
  refactoredCode = "",
  code = "",
  futureSuggestions = [],
  language = "typescript",
}: ResultDataProps) {
  return (
    <div className={styles.mainContainer}>
      <div
        className={`${styles.defaultContainer} ${styles.diagnosisContainer}`}
      >
        <div className={styles.defaultContainerTitle}>
          <p className={styles.title}>1. Diagnosis</p>
          <div
            className={`${styles.defaultContainerEmphasis} ${styles.defaultColor}`}
          >
            {diagnosis.length} issues found
          </div>
        </div>

        <p className={styles.subtitle}>Problems identified in your code:</p>
        <div className={styles.diagnosisItensContainer}>
          {diagnosis.map((diag) => (
            <div className={styles.diagnosisItem}>
              <TriangleAlert size={45} color="yellow" />
              <div className={styles.diagnosisText}>
                <p className={styles.diagnosisIssue}> {diag.issue} </p>
                <p className={styles.diagnosisExplanation}>
                  {" "}
                  {diag.explanation}{" "}
                </p>
              </div>
              <p className={`${styles.impact} ${styles[diag.impact]}`}>
                {" "}
                {diag.impact}{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.codeContainer}>
        <div className={styles.defaultContainer}>
          <div className={styles.defaultContainerTitle}>
            <p className={styles.title}>2. Original Code</p>
            <div
              className={`${styles.defaultContainerEmphasis} ${styles.defaultColor}`}
            >
              Input
            </div>
          </div>
          <p className={styles.subtitle}>
            The original code before refactoring:
          </p>
          <CodeEditor
            value={code}
            height="200px"
            languageOptions={[language]}
            readOnly={true}
            type="original"
          />
        </div>

        <div className={styles.defaultContainer}>
          <div className={styles.defaultContainerTitle}>
            <p className={styles.title}> 3. Refactored Code</p>
            <div
              className={`${styles.defaultContainerEmphasis} ${styles.refactoredColor}`}
            >
              Refactored
            </div>
          </div>
          <p className={styles.subtitle}>Improved and type-safe version:</p>
          <CodeEditor
            value={refactoredCode}
            height="200px"
            languageOptions={[language]}
            readOnly={true}
            type="refactored"
          />
        </div>
      </div>
      <div className={styles.codeContainer}>
        <div className={styles.defaultContainer}>
          <p className={styles.title}> 4. Improvements</p>
          <p className={styles.subtitle}>
            The original code before refactoring:
          </p>
        </div>

        <div className={styles.defaultContainer}>
          <p className={styles.title}> 5. Futture Suggestions</p>
          <p className={styles.subtitle}>Improved and type-safe version:</p>
        </div>
      </div>
    </div>
  );
}
