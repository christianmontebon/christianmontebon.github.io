import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  radius: number
  life: number
  maxLife: number
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      return
    }

    const setSize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      const last = lastPosRef.current
      const dist = last ? Math.hypot(x - last.x, y - last.y) : 0
      lastPosRef.current = { x, y }

      // Spawn fewer, much larger blobs (hand-sized aura)
      const count = Math.max(1, Math.min(2, Math.floor(dist / 24)))
      for (let i = 0; i < count; i++) {
        const jitterX = (Math.random() - 0.5) * 2
        const jitterY = (Math.random() - 0.5) * 2
        particlesRef.current.push({
          x: x + jitterX,
          y: y + jitterY,
          radius: 120 + Math.random() * 80, // big, hand-like footprint
          life: 1,
          maxLife: 1,
        })
      }
      // cap max particles to avoid buildup
      const maxParticles = 16
      if (particlesRef.current.length > maxParticles) {
        particlesRef.current.splice(0, particlesRef.current.length - maxParticles)
      }
    }

    let lastTs = 0
    const render = (ts: number) => {
      const dt = Math.min(32, ts - lastTs || 16) / 1000
      lastTs = ts
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.globalCompositeOperation = 'lighter'
      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= dt * 0.5 // moderate fade to keep a soft, large aura
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        const t = p.life / p.maxLife
        const r = p.radius * (1.0 + 0.2 * t)

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
        // emerald -> cyan -> sky palette, matching site accents
        grad.addColorStop(0, `rgba(16, 185, 129, ${0.035 * t})`)
        grad.addColorStop(0.5, `rgba(6, 182, 212, ${0.02 * t})`)
        grad.addColorStop(1, `rgba(2, 132, 199, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('resize', setSize)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('resize', setSize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 opacity-[0.16] mix-blend-screen"
      aria-hidden="true"
    />
  )
}
