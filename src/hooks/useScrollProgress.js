import { useEffect, useState } from 'react'

export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const target = ref?.current ?? document.documentElement

    const measure = () => {
      const el = ref?.current ?? target
      if (ref?.current) {
        const rect = el.getBoundingClientRect()
        const total = el.scrollHeight - window.innerHeight
        const scrolled = -rect.top
        const next = total <= 0 ? 1 : Math.min(1, Math.max(0, scrolled / total))
        setProgress(next)
        return
      }
      const doc = document.documentElement
      const total = doc.scrollHeight - window.innerHeight
      const next = total <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / total))
      setProgress(next)
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [ref])

  return progress
}
