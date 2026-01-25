import { useEffect, useRef } from 'react'

export default function Spotlight() {
  const divRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const targetPosRef = useRef<{ x: number; y: number } | null>(null)
  const currentPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const isAnimatingRef = useRef(false)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) {
      return
    }

    const animate = () => {
      if (!divRef.current || !targetPosRef.current) {
        isAnimatingRef.current = false
        return
      }

      // Smooth interpolation for smoother movement
      const dx = targetPosRef.current.x - currentPosRef.current.x
      const dy = targetPosRef.current.y - currentPosRef.current.y
      
      // Use easing factor for smooth interpolation
      currentPosRef.current.x += dx * 0.2
      currentPosRef.current.y += dy * 0.2
      
      divRef.current.style.setProperty(
        '--spotlight-x',
        `${currentPosRef.current.x}px`
      )
      divRef.current.style.setProperty(
        '--spotlight-y',
        `${currentPosRef.current.y}px`
      )
      
      // Continue animation if not close enough
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        isAnimatingRef.current = false
      }
    }

    const handleMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY }
      
      // Initialize current position on first move
      if (currentPosRef.current.x === 0 && currentPosRef.current.y === 0) {
        currentPosRef.current.x = e.clientX
        currentPosRef.current.y = e.clientY
        if (divRef.current) {
          divRef.current.style.setProperty('--spotlight-x', `${e.clientX}px`)
          divRef.current.style.setProperty('--spotlight-y', `${e.clientY}px`)
        }
      }
      
      // Start animation loop if not already running
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
      style={{
        background: `radial-gradient(800px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(100, 220, 210, 0.08), transparent 90%)`,
        willChange: 'background',
        '--spotlight-x': '50%',
        '--spotlight-y': '50%',
      } as React.CSSProperties}
    />
  )
}
