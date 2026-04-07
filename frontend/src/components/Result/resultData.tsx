import styles from "./style.module.css";
import type { ResultDataProps } from "./diagnosis";
import CodeEditor from "../CodeEditor/codeEditor";
import { CircleCheck, Lightbulb, ShieldCheck, Sparkle, Sparkles, TrendingUp, TriangleAlert } from "lucide-react";

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
      <p className={styles.resultTitle}>
        <Sparkles size={30} fill="#5F87EA" color="#5F87EA"/>
        Refactor Result
      </p>
      <p className={styles.resultSubtitle}>
        Review, understand and apply the improvements to your code
      </p>
      <div className={styles.summaryContainer}>
        <div className={`${styles.summaryButton} ${styles.blue}`}>
          <div className={`${styles.summaryIcon} ${styles.blue}`}>
            <TriangleAlert size={30} color="#4762A8" />
          </div>
          <div className={styles.summaryText}>
            <p className={styles.summaryNumber}>{diagnosis.length}</p>
            <p className={styles.summaryTitle}>Issue found</p>
          </div>
        </div>
        <div className={`${styles.summaryButton} ${styles.green}`}>
          <div className={`${styles.summaryIcon} ${styles.green}`}>
          <Lightbulb size={30} color="#74CD9E" />
          </div>
          <div className={styles.summaryText}>
            <p className={styles.summaryNumber}>{improvements.length}</p>
            <p className={styles.summaryTitle}>Improvements</p>
          </div>
        </div>
        <div className={`${styles.summaryButton} ${styles.purple}`}>
          <div className={`${styles.summaryIcon} ${styles.purple}`}>
          <TrendingUp size={30} color="#C9A2F2" />
          </div>
          <div className={styles.summaryText}>
            <p className={styles.summaryNumber}>{futureSuggestions.length}</p>
            <p className={styles.summaryTitle}>Future Suggestions</p>
          </div>
        </div>
        <div className={`${styles.summaryButton} ${styles.gray}`}>
          <div className={`${styles.summaryIcon} ${styles.gray}`}>
            <ShieldCheck size={30} color="white" />
          </div>
          <div className={styles.summaryText}>
            <p className={styles.summaryTitle}>Safe</p>
          </div>
        </div>
      </div>
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
              <TriangleAlert size={35} fill="yellow" color="black" />
              <div className={styles.diagnosisText}>
                <p className={styles.diagnosisIssue}> {diag.issue} </p>
                <p className={styles.diagnosisExplanation}>
                  {diag.explanation}
                </p>
              </div>
              <p className={`${styles.impact} ${styles[diag.impact]}`}>
                {diag.impact}
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
          <div className={styles.defaultContainerTitle}>
            <p className={styles.title}>4. Improvements</p>
          </div>
          <p className={styles.subtitle}>
            The original code before refactoring:
          </p>
          <div className={styles.improvementsContainer}>
            {improvements.map((improvement) => (
              <div className={styles.improvementsItensContainer}>
                <div className={styles.improvementsItem}>
                  <CircleCheck size={35} fill="green" color="white"/>
                  <div className={styles.improvementsText}>
                    <p className={styles.improvementsTitle}>
                      {" "}
                      {improvement.title}{" "}
                    </p>
                    <p className={styles.improvementsDescription}>
                      {improvement.description}
                    </p>
                  </div>
                </div>
                <div className={styles.improvementsCriteria}>
                  {improvement.relatedCriteria.map((criteria) => (
                    <div
                      className={`${styles.defaultContainerEmphasis} ${styles.defaultColor}`}
                    >
                      {criteria}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.defaultContainer}>
          <div className={styles.defaultContainerTitle}>
            <p className={styles.title}> 5. Futture Suggestions</p>
          </div>
          <p className={styles.subtitle}>Improved and type-safe version:</p>
          <div className={styles.futureSuggestionsContainer}>
          {futureSuggestions.map((suggestion) => (
            <div className={styles.futureSuggestionsItem}>
              <Lightbulb size={45} fill="purple" color="white" />
              <div className={styles.futureSuggestionsText}>
                <p className={styles.futureSuggestionsTitle}> {suggestion.title} </p>
                <p className={styles.futureSuggestionsDescription}>
                  {suggestion.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
