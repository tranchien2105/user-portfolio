import { useEffect } from 'react'

export function useClickFeedback() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const showRipple = (event: MouseEvent) => {
      // Keyboard-triggered clicks have no meaningful pointer position.
      if (event.detail === 0) return
      const ripple = document.createElement('span')
      ripple.className = 'click-ripple'
      ripple.setAttribute('aria-hidden', 'true')
      ripple.style.left = `${event.clientX}px`
      ripple.style.top = `${event.clientY}px`
      document.body.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
    }

    document.addEventListener('click', showRipple)
    return () => document.removeEventListener('click', showRipple)
  }, [])
}
