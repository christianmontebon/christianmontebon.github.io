import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

interface ArchiveItem {
  title: string
  slug: string
  date?: string
  description?: string
  scope?: string
  tools?: string[]
  image?: string
}

interface ArchiveLayoutProps {
  title: string
  description?: string
  items: ArchiveItem[]
  basePath?: string // when provided, href becomes `${basePath}/${slug}` unless slug is an absolute URL
  showFilters?: boolean // enable filtering by scope/tools
}

export default function ArchiveLayout({
  title,
  description,
  items,
  basePath,
  showFilters = false,
}: ArchiveLayoutProps) {
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [selectedScopes, setSelectedScopes] = useState<string[]>([])

  // Extract all unique tools and scopes
  const allTools = useMemo(() => {
    const tools = new Set<string>()
    items.forEach(item => {
      item.tools?.forEach(tool => tools.add(tool))
    })
    return Array.from(tools).sort()
  }, [items])

  const allScopes = useMemo(() => {
    const scopes = new Set<string>()
    items.forEach(item => {
      if (item.scope) scopes.add(item.scope)
    })
    return Array.from(scopes).sort()
  }, [items])

  // Filter items based on selected filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // If tools are selected, item must have at least one selected tool
      if (
        selectedTools.length > 0 &&
        !item.tools?.some(tool => selectedTools.includes(tool))
      ) {
        return false
      }
      // If scopes are selected, item must match one of the selected scopes
      if (
        selectedScopes.length > 0 &&
        (!item.scope || !selectedScopes.includes(item.scope))
      ) {
        return false
      }
      return true
    })
  }, [items, selectedTools, selectedScopes])

  const toggleTool = (tool: string) => {
    setSelectedTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    )
  }

  const toggleScope = (scope: string) => {
    setSelectedScopes(prev =>
      prev.includes(scope) ? prev.filter(s => s !== scope) : [...prev, scope]
    )
  }

  const resetFilters = () => {
    setSelectedTools([])
    setSelectedScopes([])
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors italic underline"
            >
              back to home
            </Link>
          </div>
          {description ? (
            <p className="text-muted-foreground mt-3">{description}</p>
          ) : null}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <ul className="space-y-8">
              {filteredItems.map(item => {
                const isAbsolute =
                  item.slug.startsWith('http://') ||
                  item.slug.startsWith('https://')
                const href = isAbsolute
                  ? item.slug
                  : basePath
                    ? `${basePath}/${item.slug}`
                    : item.slug
                const date = item.date

                const hasImage = item.image && item.image.trim() !== ''
                const content = (
                  <div className="space-y-4">
                    {hasImage && (
                      <div className="w-full overflow-hidden rounded-lg border border-border">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-foreground hover:underline underline-offset-4 font-medium">
                          {item.title}
                        </span>
                        {item.scope && (
                          <span className="text-xs text-muted-foreground font-medium">
                            {item.scope}
                          </span>
                        )}
                        {date ? (
                          <span className="text-xs text-muted-foreground">
                            {date}
                          </span>
                        ) : null}
                      </div>
                      {item.description ? (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      ) : null}
                      {item.tools && item.tools.length > 0 && (
                        <div className="text-xs text-muted-foreground italic">
                          {item.tools.join(', ')}
                        </div>
                      )}
                    </div>
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

          {/* Filters sidebar */}
          {showFilters && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Tools filter */}
                {allTools.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">
                      Tools
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allTools.map(tool => (
                        <button
                          key={tool}
                          onClick={() => toggleTool(tool)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            selectedTools.includes(tool)
                              ? 'bg-foreground/10 border-foreground/30 text-foreground'
                              : 'bg-background border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scope filter */}
                {allScopes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">
                      Scope
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {allScopes.map(scope => (
                        <button
                          key={scope}
                          onClick={() => toggleScope(scope)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            selectedScopes.includes(scope)
                              ? 'bg-foreground/10 border-foreground/30 text-foreground'
                              : 'bg-background border-border text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {scope}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reset filters */}
                {(selectedTools.length > 0 || selectedScopes.length > 0) && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
