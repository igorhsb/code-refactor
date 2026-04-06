import { Fragment } from "react";
import "./styles.css";
import type { ResultDataProps } from "./diagnosis";


export default function ResultData({
  diagnosis = [],
  improvements = [],
  refactoredCode = "",
  futureSuggestions = [],
}: ResultDataProps) {

  return (
    <div className="main-container">
      <div className="refactored-code-container">
        <p>RefactoredCode</p>
        {refactoredCode}
      </div>
      <div className="diagnosis-container">
        <p>Diagnosis</p>
        {diagnosis.map((diag) => (
          <Fragment>
            impact: {diag.impact}
            explanation: {diag.explanation}
            issue: {diag.issue}
          </Fragment>
        ))}
      </div>
      <div className="improvements-container">
        <p>Improvement</p>
        {improvements.map((improv) => (
          <Fragment>
            <p>description: {improv.description}</p>
            <p>title: {improv.title}</p>
            <ul>
              {improv.relatedCriteria.map((criteria) => (
                <li>{criteria}</li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
      <div className="future-suggestion-container">
        <p>FutureSuggestions</p>
        {futureSuggestions.map((suggestion) => (
          <Fragment>
            <p>description: {suggestion.description}</p>
            <p>title: {suggestion.title}</p>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
