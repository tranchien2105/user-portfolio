import { useEffect } from 'react'

export function usePointerAmbient() {
  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsHover || reducedMotion) return

    let frame = 0
    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 3
    const root = document.documentElement
    const update = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>('.panel')
      if (card) {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
        card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
      }
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          root.style.setProperty('--pointer-x', `${pointerX}px`)
          root.style.setProperty('--pointer-y', `${pointerY}px`)
          frame = 0
        })
      }
    }
    window.addEventListener('pointermove', update, { passive: true })
    return () => {
      window.removeEventListener('pointermove', update)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])
}
