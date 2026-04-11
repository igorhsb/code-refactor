import type { Language } from "../types/userLanguage";
import type { TranslationSchema } from "../types/translation";

import { en } from "./en";
import { pt } from "./pt";
import { es } from "./es";

export const translations: Record<Language, TranslationSchema> = {
  en,
  pt,
  es,
};