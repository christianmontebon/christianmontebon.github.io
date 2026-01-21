import { useState, useEffect, RefObject } from 'react'

interface NavItem {
  id: string
  label: string
}

export function useActiveSection(
  navItems: NavItem[],
  sectionRefs: RefObject<{ [key: string]: HTMLElement | null }>
) {
  const [activeSection, setActiveSection] = useState(navItems[0]?.id || '')

  useEffect(() => {
    const elements = navItems
      .map(item => sectionRefs.current?.[item.id])
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    // Use an IntersectionObserver centered band to detect the visible section
    const visible: Record<string, boolean> = {}
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          visible[id] = entry.isIntersecting
        }
        // Pick the first nav item in order that is intersecting
        for (const item of navItems) {
          if (visible[item.id]) {
            setActiveSection(item.id)
            return
          }
        }
        // Fallback: if nothing intersecting, keep existing
      },
      {
        // Focus on a center band (~20% tall) so the active state matches what's centered
        root: null,
        rootMargin: '-40% 0% -40% 0%',
        threshold: [0, 0.01, 0.1, 0.2, 0.5, 0.8, 1],
      }
    )

    elements.forEach(el => io.observe(el))
    // Bottom-of-page fallback: ensure last section activates when near bottom
    const handleBottom = () => {
      const winH = window.innerHeight
      const docH = document.documentElement.scrollHeight
      const scrollY = window.scrollY
      if (scrollY + winH >= docH - 80) {
        setActiveSection(navItems[navItems.length - 1].id)
      }
    }
    window.addEventListener('scroll', handleBottom, { passive: true })
    handleBottom()

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', handleBottom)
    }
  }, [navItems, sectionRefs])

  return activeSection
}
