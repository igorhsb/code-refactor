import styles from "./style.module.css";
import CodeEditor from "../../components/CodeEditor/codeEditor";
import {
  CircleCheck,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "../../hooks/useTranslation";
import PageHeader from "../../components/PageHeader/pageHeader";

export default function ResultData() {
  const { code, language, result } = useAppContext();
  const navigate = useNavigate();
  const { userLanguage } = useLanguage();
  const t = useTranslation();

  useEffect(() => {
    if (!result) {
      navigate("/");
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  function getImpactTranslateValue(identifier: string) {
    return t.result.impact.find(imp => {
      return imp.identifier === identifier
    })?.value
  }

  console.log(userLanguage)

  return (
    <div>
      <PageHeader canChangeLanguage={false}/>
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
        <p className={styles.resultTitle}>
          <Sparkles size={30} fill="#5F87EA" color="#5F87EA" />
          {t.result.title}
        </p>
        <p className={styles.resultSubtitle}>
          {t.result.subtitle}
        </p>
        </div>
      </div>
      <div className={styles.summaryContainer}>
        <div className={`${styles.summaryButton} ${styles.blue}`}>
          <div className={`${styles.summaryIcon} ${styles.blue}`}>
            <TriangleAlert size={30} color="#4762A8" />
          </div>
          <div className={styles.summaryText}>
            <p className={styles.summaryNumber}>{result.diagnosis.length}</p>
            <p className={styles.summaryTitle}>{t.result.diagnosis.extraLabel}</p>
          </div>
        </div>
        <div className={`${styles.summaryButton} ${styles.green}`}>
          <div className={`${styles.summaryIcon} ${styles.green}`}>
            <Lightbulb size={30} color="#74CD9E" />
          </div>
          <div className={styles.summaryText}>
            <p className={styles.summaryNumber}>{result.improvements.length}</p>
            <p className={styles.summaryTitle}>{t.result.improvements.title}</p>
          </div>
        </div>
        <div className={`${styles.summaryButton} ${styles.purple}`}>
          <div className={`${styles.summaryIcon} ${styles.purple}`}>
            <TrendingUp size={30} color="#C9A2F2" />
          </div>
          <div className={styles.summaryText}>
            <p className={styles.summaryNumber}>
              {result.futureSuggestions.length}
            </p>
            <p className={styles.summaryTitle}>{t.result.futtureSuggestion.title}</p>
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
          <p className={styles.title}>1. {t.result.diagnosis.title}</p>
          <div
            className={`${styles.defaultContainerEmphasis} ${styles.defaultColor}`}
          >
            {result.diagnosis.length} {t.result.diagnosis.extraLabel}
          </div>
        </div>

        <p className={styles.subtitle}>{t.result.diagnosis.subtitle}</p>
        <div className={styles.diagnosisItensContainer}>
          {result.diagnosis.map((diag, index) => (
            <div className={styles.diagnosisItem} key={index}>
              <TriangleAlert size={35} fill="yellow" color="black" />
              <div className={styles.diagnosisText}>
                <p className={styles.diagnosisIssue}> {diag.issue} </p>
                <p className={styles.diagnosisExplanation}>
                  {diag.explanation}
                </p>
              </div>
              <p className={`${styles.impact} ${styles[diag.impact]}`}>
                {getImpactTranslateValue(diag.impact)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.codeContainer}>
        <div className={styles.defaultContainer}>
          <div className={styles.defaultContainerTitle}>
            <p className={styles.title}>2. {t.result.originalCode.title}</p>
            <div
              className={`${styles.defaultContainerEmphasis} ${styles.defaultColor}`}
            >
              {t.result.originalCode.extraLabel}
            </div>
          </div>
          <p className={styles.subtitle}>
            {t.result.originalCode.subtitle}
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
            <p className={styles.title}> 3. {t.result.refactoredCode.title}</p>
            <div
              className={`${styles.defaultContainerEmphasis} ${styles.refactoredColor}`}
            >
              {t.result.refactoredCode.extraLabel}
            </div>
          </div>
          <p className={styles.subtitle}>{t.result.refactoredCode.subtitle}</p>
          <CodeEditor
            value={result.refactoredCode}
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
            {result.improvements.map((improvement, index) => (
              <div className={styles.improvementsItensContainer} key={index}>
                <div className={styles.improvementsItem}>
                  <CircleCheck size={35} fill="green" color="white" />
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
                  {improvement.relatedCriteria.map((criteria, index) => (
                    <div
                      key={index}
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
            {result.futureSuggestions.map((suggestion, index) => (
              <div className={styles.futureSuggestionsItem} key={index}>
                <Lightbulb size={45} fill="purple" color="white" />
                <div className={styles.futureSuggestionsText}>
                  <p className={styles.futureSuggestionsTitle}>
                    {" "}
                    {suggestion.title}{" "}
                  </p>
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
    </div>
  );
}
