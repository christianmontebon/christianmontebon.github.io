import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { experiences } from '../data/experiences'
import ExperienceCard from './ExperienceCard'

interface ExperienceProps {
  sectionRef: (el: HTMLElement | null) => void
}

export default function Experience({ sectionRef }: ExperienceProps) {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)

  return (
    <section id="experience" ref={sectionRef} className="mb-24 scroll-mt-24">
      <h2 className="text-xs font-medium tracking-widest text-foreground mb-8 lg:hidden">
        EXPERIENCE
      </h2>
      <div
        className={`space-y-2 ${hoveredExp !== null ? 'children-dimmed' : ''}`}
      >
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={index}
            experience={exp}
            isHovered={hoveredExp === index}
            onHover={hovered => setHoveredExp(hovered ? index : null)}
          />
        ))}
      </div>
      <a
        href="/resume.pdf"
        className="inline-flex items-center gap-1 mt-8 text-foreground font-medium hover:text-foreground/80 transition-colors group"
      >
        View Full Résumé
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </section>
  )
}
