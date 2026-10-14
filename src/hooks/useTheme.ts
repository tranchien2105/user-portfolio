import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch { /* Storage is optional. */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* Storage is optional. */ }
  }, [theme])
  return { theme, toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light') }
}
