import { useEffect, useState } from 'react'

export function useTypewriter(words: string[], enabled = true): string {
  const [text, setText] = useState(words[0] ?? '')

  useEffect(() => {
    if (!enabled || words.length < 2) {
      setText(words[0] ?? '')
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      setText(words[0] ?? '')
      return
    }

    let wordIndex = 0
    let charIndex = words[0]?.length ?? 0
    let deleting = true
    let timeout = 0

    const tick = () => {
      const current = words[wordIndex] ?? ''
      if (deleting) {
        charIndex -= 1
        setText(current.slice(0, Math.max(charIndex, 0)))
        if (charIndex <= 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
          timeout = window.setTimeout(tick, 280)
          return
        }
        timeout = window.setTimeout(tick, 32)
        return
      }

      const nextWord = words[wordIndex] ?? ''
      charIndex += 1
      setText(nextWord.slice(0, charIndex))
      if (charIndex >= nextWord.length) {
        deleting = true
        timeout = window.setTimeout(tick, 1700)
        return
      }
      timeout = window.setTimeout(tick, 72)
    }

    timeout = window.setTimeout(tick, 1700)
    return () => window.clearTimeout(timeout)
  }, [enabled, words])

  return text
}
