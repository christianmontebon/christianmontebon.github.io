import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

interface ProjectCardProps {
  project: (typeof projects)[0]
  isHovered: boolean
  onHover: (hovered: boolean) => void
}

export default function ProjectCard({
  project,
  isHovered,
  onHover,
}: ProjectCardProps) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-lg p-4 -mx-4 transition-all duration-200 ${isHovered ? 'bg-foreground/5' : ''}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors flex items-center gap-1">
        {project.title}
        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
      </h3>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
        {project.description}
      </p>
    </a>
  )
}
