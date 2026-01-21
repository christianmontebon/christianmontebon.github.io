import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import { defaultSchema } from 'hast-util-sanitize'
import { parseFrontmatter } from '../utils/frontmatter'
import { notes, noteContentByPath } from '../data/notes'

export default function NoteDetailPage() {
  const { slug = '' } = useParams()

  const match = notes.find(n => {
    const file = n.path.split('/').pop() || ''
    const s = file.replace(/\\.md$/, '')
    return s === slug
  })
  const raw = match ? noteContentByPath[match.path] : undefined

  const parsed = useMemo(() => {
    if (!raw) return null
    return parseFrontmatter(raw)
  }, [raw])

  if (!raw || !parsed) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-muted-foreground">Not found.</p>
          <Link to="/notes" className="text-sm hover:underline underline-offset-4">
            Back to notes
          </Link>
        </div>
      </div>
    )
  }

  const { data, content } = parsed
  const title = match?.title ?? String(data.title ?? slug)
  const date = String(data.date ?? '')

  // Allow highlight.js classes and language-* on pre/code
  const schema: any = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      code: [
        ...(defaultSchema.attributes?.code || []),
        ['className', 'language-*'],
      ],
      pre: [
        ...(defaultSchema.attributes?.pre || []),
        ['className', 'language-*'],
      ],
      span: [
        ...(defaultSchema.attributes?.span || []),
        ['className', 'hljs-*'],
      ],
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {date ? (
            <p className="text-sm text-muted-foreground mt-2">{date}</p>
          ) : null}
        </header>

        <article className="text-foreground">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeRaw], [rehypeSanitize, schema], [rehypeHighlight]]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-3xl font-semibold tracking-tight mt-8 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="leading-7 mt-4 text-foreground/90" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="underline underline-offset-4 hover:no-underline" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 space-y-2 mt-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 space-y-2 mt-4" {...props} />
              ),
              li: ({ node, ...props }) => <li className="leading-7" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="mt-4 border-l-2 border-border pl-4 italic text-foreground/80 bg-foreground/5 rounded" {...props} />
              ),
              img: ({ node, ...props }) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img className="mt-4 rounded" {...props} />
              ),
              hr: ({ node, ...props }) => <hr className="my-8 border-border" {...props} />,
              table: ({ node, ...props }) => (
                <table className="w-full border-collapse mt-6 text-sm" {...props} />
              ),
              thead: ({ node, ...props }) => <thead className="text-foreground" {...props} />,
              th: ({ node, ...props }) => (
                <th className="text-left font-semibold border-b border-border pb-2" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border-b border-border/60 py-2 align-top" {...props} />
              ),
              // TS: react-markdown's typings don't expose `inline` here; accept any for simplicity.
              // Also detect block code by presence of language-* class as a fallback.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              code: ({ node, inline, className, ...props }: any) => {
                const isBlock = (!inline && /language-/.test(className || '')) || (className && /language-/.test(className))
                if (isBlock) {
                  return (
                    <code
                      className="block p-4 rounded bg-foreground/10 text-foreground/90 overflow-x-auto text-sm"
                      {...props}
                    />
                  )
                }
                return (
                  <code
                    className="inline-block whitespace-nowrap align-baseline px-1.5 py-0.5 rounded bg-foreground/10 text-foreground/90"
                    {...props}
                  />
                )
              },
              pre: ({ node, ...props }) => <pre className="my-4" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        <div className="mt-10">
          <Link to="/notes" className="text-sm hover:underline underline-offset-4">
            ← Back to notes
          </Link>
        </div>
      </div>
    </div>
  )
}

