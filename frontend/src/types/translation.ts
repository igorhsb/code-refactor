type sectionText = {
  title: string;
  subtitle: string;
  extraLabel?: string;
};

type impactText = {
  identifier: string;
  value: string;
};

export type TranslationSchema = {
  input: {
    title: string;
    placeholder: string;
    button: string;
    about: string;
    contact: string;
    copyButton: string;
    copiedButton: string;
  };
  result: {
    title: string;
    originalCode: sectionText;
    refactoredCode: sectionText;
    subtitle: string;
    diagnosis: sectionText;
    improvements: sectionText;
    futtureSuggestion: sectionText;
    impact: impactText[];
  };
  about: {
    title: string;
    text: string;
  };
  contact: {
    title: string;
    text: string;
  };
};
