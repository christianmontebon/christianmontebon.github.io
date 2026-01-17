import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

interface ProjectsProps {
  sectionRef: (el: HTMLElement | null) => void
}

export default function Projects({ sectionRef }: ProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" ref={sectionRef} className="mb-24 scroll-mt-24">
      <h2 className="text-xs font-medium tracking-widest text-foreground mb-8 lg:hidden">
        PROJECTS
      </h2>
      <div
        className={`space-y-2 ${hoveredProject !== null ? 'children-dimmed' : ''}`}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            isHovered={hoveredProject === index}
            onHover={hovered => setHoveredProject(hovered ? index : null)}
          />
        ))}
      </div>
      <a
        href="/projects"
        className="inline-flex items-center gap-1 mt-8 text-foreground font-medium hover:text-foreground/80 transition-colors group"
      >
        View Full Project Archive
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </section>
  )
}
