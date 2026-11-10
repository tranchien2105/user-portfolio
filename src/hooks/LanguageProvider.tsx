import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LanguageContext, type Language } from "./useLanguage";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("lang") === "en" ? "en" : "vi";
    } catch {
      return "vi";
    }
  });
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const value = useMemo(
    () => ({
      language,
      toggleLanguage: () =>
        setLanguage((current) => {
          const next = current === "vi" ? "en" : "vi";
          try {
            localStorage.setItem("lang", next);
          } catch {
            /* Storage is optional. */
          }
          return next;
        }),
    }),
    [language],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
