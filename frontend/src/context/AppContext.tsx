import { createContext, useContext, useState } from "react";
import type { ResultDataProps } from "../pages/Result/diagnosis";

type AppContextType = {
  code: string;
  setCode: (v: string) => void;
  language: string;
  setLanguage: (v: string) => void;
  result?: ResultDataProps;
  setResult: (v: ResultDataProps) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState<ResultDataProps>();

  return (
    <AppContext.Provider
      value={{ code, setCode, language, setLanguage, result, setResult }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within provider");
  return ctx;
}