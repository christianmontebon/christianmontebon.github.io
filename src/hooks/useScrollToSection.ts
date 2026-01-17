import { RefObject } from 'react'

export function useScrollToSection(
  sectionRefs: RefObject<{ [key: string]: HTMLElement | null }>
) {
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current?.[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return scrollToSection
}
