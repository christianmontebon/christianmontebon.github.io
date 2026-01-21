import { Link } from 'react-router-dom'

interface ArchiveItem {
  title: string
  slug: string
  date?: string
}

interface ArchiveLayoutProps {
  title: string
  description?: string
  items: ArchiveItem[]
  basePath?: string // when provided, href becomes `${basePath}/${slug}` unless slug is an absolute URL
}

export default function ArchiveLayout({
  title,
  description,
  items,
  basePath,
}: ArchiveLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {description ? (
            <p className="text-muted-foreground mt-3">{description}</p>
          ) : null}
        </header>

        <ul className="space-y-4">
          {items.map(item => {
            const isAbsolute =
              item.slug.startsWith('http://') || item.slug.startsWith('https://')
            const href = isAbsolute
              ? item.slug
              : basePath
              ? `${basePath}/${item.slug}`
              : item.slug
            const date = item.date

            const content = (
              <div className="flex items-baseline gap-3">
                <span className="text-foreground hover:underline underline-offset-4">
                  {item.title}
                </span>
                {date ? (
                  <span className="text-xs text-muted-foreground">{date}</span>
                ) : null}
              </div>
            )

            return (
              <li key={item.slug} className="py-1">
                {isAbsolute ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <Link to={href} className="block">
                    {content}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
