import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type Language = 'vi' | 'en'
const LanguageContext = createContext<{ language: Language; toggleLanguage: () => void } | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('lang') === 'en' ? 'en' : 'vi' } catch { return 'vi' }
  })
  const toggleLanguage = () => setLanguage((current) => {
    const next = current === 'vi' ? 'en' : 'vi'
    try { localStorage.setItem('lang', next) } catch { /* Storage is optional. */ }
    document.documentElement.lang = next
    return next
  })
  const value = useMemo(() => ({ language, toggleLanguage }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

export function text(vi: string, en: string, language: Language) { return language === 'vi' ? vi : en }
