import { createContext, useContext } from "react";

export type Language = "vi" | "en";
export const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
} | null>(null);
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function text(vi: string, en: string, language: Language) {
  return language === "vi" ? vi : en;
}
