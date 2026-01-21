import ArchiveLayout from '../ui/ArchiveLayout'
import { parseFrontmatter } from '../utils/frontmatter'
import { notes, noteContentByPath } from '../data/notes'

type NoteMeta = {
  title: string
  date: string
  slug: string
}

export default function NotesPage() {
  const items: NoteMeta[] = notes
    .map(n => {
      const raw = noteContentByPath[n.path] || ''
      const { data } = parseFrontmatter(raw)
      return {
        title: n.title,
        date: String(data.date ?? ''),
        slug: n.slug,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <ArchiveLayout
      title="Notes"
      description="Minimal, readable, and to the point."
      items={items}
      basePath="/notes"
    />
  )
}
