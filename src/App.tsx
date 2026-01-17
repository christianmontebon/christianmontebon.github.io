import { useState, useEffect, useRef } from 'react'
import { navItems } from './data/navItems'
import Header from './components/Header'
import About from './components/About'
import Experience from './components/Experiences'
import Projects from './components/Projects'

export default function App() {
  const [activeSection, setActiveSection] = useState('about')
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

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
        const element = sectionRefs.current[section.id]
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
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="lg:flex lg:gap-12">
          <Header activeSection={activeSection} onNavigate={scrollToSection} />

          <main className="lg:w-[55%] lg:pt-24">
            <About
              sectionRef={el => {
                sectionRefs.current.about = el
              }}
            />
            <Experience
              sectionRef={el => {
                sectionRefs.current.experience = el
              }}
            />
            <Projects
              sectionRef={el => {
                sectionRefs.current.projects = el
              }}
            />

            <footer className="text-sm text-muted-foreground pb-24"></footer>
          </main>
        </div>
      </div>
    </div>
  )
}
