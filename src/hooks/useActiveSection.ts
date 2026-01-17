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
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // If near bottom of page, activate last section
      if (window.scrollY + windowHeight >= documentHeight - 100) {
        setActiveSection(navItems[navItems.length - 1].id)
        return
      }

      // Find the section currently in view
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = navItems[i]
        const element = sectionRefs.current?.[section.id]
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id)
            return
          }
        }
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems, sectionRefs])

  return activeSection
}
