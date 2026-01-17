import { Github, Linkedin } from 'lucide-react'
import Navigation from './Navigation'

interface HeaderProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  return (
    <header className="lg:w-[45%] lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Christian Montebon
        </h1>
        <h2 className="text-lg font-medium text-foreground/80 mt-3">
          Web Developer
        </h2>
        <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">
          I build clean, reliable web applications with a strong focus on
          usability, maintainability, and real-world business needs.
        </p>

        <Navigation activeSection={activeSection} onNavigate={onNavigate} />
      </div>

      {/* Social Links */}
      <div className="flex gap-5 mt-8 lg:mt-0 py-8 lg:py-0">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </header>
  )
}
