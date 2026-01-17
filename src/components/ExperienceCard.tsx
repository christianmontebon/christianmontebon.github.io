import { ArrowUpRight } from 'lucide-react'
import { experiences } from '../data/experiences'

interface ExperienceCardProps {
  experience: (typeof experiences)[0]
  isHovered: boolean
  onHover: (hovered: boolean) => void
}

export default function ExperienceCard({
  experience,
  isHovered,
  onHover,
}: ExperienceCardProps) {
  return (
    <a
      href={experience.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-lg p-4 -mx-4 transition-all duration-200 ${isHovered ? 'bg-foreground/5' : ''}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="text-xs text-muted-foreground font-medium tracking-wide w-32 shrink-0 pt-1">
          {experience.period}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors flex items-center gap-1">
            {experience.title} · {experience.company}
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            {experience.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {experience.technologies.map(tech => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}
