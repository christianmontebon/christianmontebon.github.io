export type FrontmatterParseResult = {
  data: Record<string, string>
  content: string
}

export function parseFrontmatter(raw: string): FrontmatterParseResult {
  // Simple frontmatter parser for:
  // ---
  // key: value
  // ---
  // content...
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, content: raw }
  }

  const [, header, rest] = match
  const data: Record<string, string> = {}

  for (const line of header.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    // Strip surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }

  return { data, content: rest }
}
