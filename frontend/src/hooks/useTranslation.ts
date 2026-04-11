import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n";

export function useTranslation() {
  const { userLanguage } = useLanguage();

  return translations[userLanguage];
}