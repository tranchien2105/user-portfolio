import { useEffect } from 'react'

/** Adds a visible class when elements marked data-reveal enter view. */
export function useScrollReveal(): void {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.section:not(#home), .hero-copy, .hero > .terminal')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('reveal-visible'))
      return
    }
    targets.forEach((target) => target.classList.add('reveal-ready'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])
}
