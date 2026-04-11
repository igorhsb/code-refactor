// src/context/LanguageContext.tsx

import { createContext, useContext, useState } from "react";
import type { Language } from "../types/userLanguage";

type LanguageContextType = {
  userLanguage: Language;
  setUserLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [userLanguage, setUserLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ userLanguage, setUserLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within provider");
  return ctx;
}