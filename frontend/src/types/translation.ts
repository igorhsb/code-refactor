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
    originalCode: string;
    refactoredCode: string;
  };
};