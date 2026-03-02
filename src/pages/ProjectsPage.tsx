import ArchiveLayout from '../ui/ArchiveLayout'
import { projects } from '../data/projects'

export default function ProjectsPage() {
  const items = projects.map(p => ({
    title: p.title,
    slug: p.url, // external link
    description: p.description,
    scope: p.scope,
    tools: p.tools,
    image: p.image,
    scrollToTop: p.isCurrentSite,
  }))

  return (
    <ArchiveLayout
      title="Projects"
      description="a mix of personal and collaborative work"
      items={items}
      showFilters={true}
    />
  )
}
