type DiagnosisData = {
  issue: string;
  impact: string;
  explanation: string;
}

type ImprovementsData = {
  title: string;
  description: string;
  relatedCriteria: string[];
}

type FutureSuggestionsData = {
  title: string;
  description: string;
}

export type ResultDataProps = {
  diagnosis: DiagnosisData[];
  improvements: ImprovementsData[];
  futureSuggestions: FutureSuggestionsData[];
  refactoredCode: string;
  code: string;
  language: string;
};