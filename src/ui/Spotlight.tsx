import { useEffect, useState } from 'react'

export default function Spotlight() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) {
      return
    }

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  if (!position) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition duration-300"
      aria-hidden="true"
      style={{
        background: `radial-gradient(800px at ${position.x}px ${position.y}px, rgba(100, 220, 210, 0.08), transparent 90%)`,
      }}
    />
  )
}
