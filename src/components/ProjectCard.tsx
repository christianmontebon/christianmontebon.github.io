import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import Badge from '../ui/Badge'

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
  const hasImage = project.image && project.image.trim() !== ''
  const maxToolsToShow = 3
  const toolsToShow = project.tools.slice(0, maxToolsToShow)
  const remainingToolsCount = project.tools.length - maxToolsToShow

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const sharedClassName = `group block rounded-lg p-4 -mx-4 transition-all duration-200 ${isHovered ? 'bg-foreground/5' : ''}`
  const sharedProps = {
    onMouseEnter: () => onHover(true),
    onMouseLeave: () => onHover(false),
  }

  if (project.isCurrentSite) {
    return (
      <button
        type="button"
        onClick={scrollToTop}
        className={`w-full text-left cursor-pointer ${sharedClassName}`}
        {...sharedProps}
      >
      <div className={`flex flex-col sm:flex-row gap-4 ${hasImage ? '' : ''}`}>
        {hasImage && (
          <div className="w-full sm:w-32 h-48 sm:h-32 shrink-0 overflow-hidden rounded-lg border border-border">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors flex items-center gap-1">
            {project.title}
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {project.description}
          </p>
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {toolsToShow.map(tool => (
                <Badge key={tool}>{tool}</Badge>
              ))}
              {remainingToolsCount > 0 && (
                <span className="text-xs text-muted-foreground">
                  +{remainingToolsCount} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
    )
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClassName}
      {...sharedProps}
    >
      <div className={`flex flex-col sm:flex-row gap-4 ${hasImage ? '' : ''}`}>
        {hasImage && (
          <div className="w-full sm:w-32 h-48 sm:h-32 shrink-0 overflow-hidden rounded-lg border border-border">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground group-hover:text-foreground/80 transition-colors flex items-center gap-1">
            {project.title}
            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {project.description}
          </p>
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {toolsToShow.map(tool => (
                <Badge key={tool}>{tool}</Badge>
              ))}
              {remainingToolsCount > 0 && (
                <span className="text-xs text-muted-foreground">
                  +{remainingToolsCount} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </a>
  )
}
