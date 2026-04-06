import { Fragment } from "react";
import styles from "./style.module.css";
import type { ResultDataProps } from "./diagnosis";


export default function ResultData({
  diagnosis = [],
  improvements = [],
  refactoredCode = "",
  futureSuggestions = [],
}: ResultDataProps) {

  return (
    <div className={styles.mainContainer}>
      <div className={styles.defaultContainer}>
          <p className={styles.title}> 1. Diagnosis</p>
          <p className={styles.subtitle}>Problems identified in your code:</p>
        </div>
      <div className={styles.codeContainer}>
        <div className={styles.defaultContainer}>
          <p className={styles.title}> 2. Original Code</p>
          <p className={styles.subtitle}>The original code before refactoring:</p>
          {refactoredCode}
        </div>

        <div className={styles.defaultContainer}>
          <p className={styles.title}> 3. Refactored Code</p>
          <p className={styles.subtitle}>Improved and type-safe version:</p>
          {refactoredCode}
        </div>
      </div>
      <div className={styles.codeContainer}>
        <div className={styles.defaultContainer}>
          <p className={styles.title}> 4. Improvements</p>
          <p className={styles.subtitle}>The original code before refactoring:</p>
        </div>

        <div className={styles.defaultContainer}>
          <p className={styles.title}> 5. Futture Suggestions</p>
          <p className={styles.subtitle}>Improved and type-safe version:</p>
        </div>
      </div>
    </div>
  );
}
