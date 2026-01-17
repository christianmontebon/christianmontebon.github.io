import { useRef } from 'react'
import { navItems } from './data/navItems'
import { useActiveSection } from './hooks/useActiveSection'
import { useScrollToSection } from './hooks/useScrollToSection'
import Header from './components/Header'
import About from './components/About'
import Experience from './components/Experiences'
import Projects from './components/Projects'

export default function App() {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})
  const activeSection = useActiveSection(navItems, sectionRefs)
  const scrollToSection = useScrollToSection(sectionRefs)

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

            <footer className="text-sm text-muted-foreground pb-24">
              Built with curiosity, a bit of vibe coding, and a constant search
              for better workflows.
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
