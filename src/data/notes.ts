import helloWorldRaw from './notes/hello-world.md?raw'
import simpleBashScriptToImportDatabaseSafelyRaw from './notes/simple-bash-script-to-import-database-safely.md?raw'
import howIBuildThingsRaw from './notes/how-i-build-things.md?raw'
import usingAIWithoutLosingControlRaw from './notes/using-ai-without-losing-control.md?raw'
import idealVsDamageControlRaw from './notes/ideal-vs-damage-control.md?raw'
import whatILearnedBuildingCanIWashClothesTodayRaw from './notes/what-i-learned-building-can-i-wash-clothes-today.md?raw'

const NOTES_DIR = 'data/notes'

function filenameToTitle(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .split('-')
    .map(word => word.charAt(0).toLowerCase() + word.slice(1))
    .join(' ')
}

type NoteInput = {
  filename: string
  tags: string[]
  date: string
  content: string
}

const noteInputs: NoteInput[] = [
  {
    filename: 'hello-world.md',
    tags: ['intro', 'personal'],
    date: '2026-01-01',
    content: helloWorldRaw,
  },
  {
    filename: 'simple-bash-script-to-import-database-safely.md',
    tags: ['tutorial'],
    date: '2026-01-13',
    content: simpleBashScriptToImportDatabaseSafelyRaw,
  },
  {
    filename: 'how-i-build-things.md',
    tags: ['thoughts'],
    date: '2026-01-07',
    content: howIBuildThingsRaw,
  },
  {
    filename: 'using-ai-without-losing-control.md',
    tags: ['thoughts'],
    date: '2026-01-07',
    content: usingAIWithoutLosingControlRaw,
  },
  {
    filename: 'ideal-vs-damage-control.md',
    tags: ['thoughts'],
    date: '2026-01-22',
    content: idealVsDamageControlRaw,
  },
  {
    filename: 'what-i-learned-building-can-i-wash-clothes-today.md',
    tags: ['learnings'],
    date: '2026-02-11',
    content: whatILearnedBuildingCanIWashClothesTodayRaw,
  }
]

export type Note = {
  path: string
  title: string
  tags: string[]
  slug: string
  date: string
}

export const notes: Note[] = noteInputs.map(input => {
  const path = `${NOTES_DIR}/${input.filename}`
  const slug = input.filename.replace(/\.md$/, '')
  const title = filenameToTitle(input.filename)
  return {
    path,
    title,
    tags: input.tags,
    date: input.date,
    slug,
  }
})

export const noteContentByPath: Record<string, string> = noteInputs.reduce(
  (acc, input) => {
    acc[`${NOTES_DIR}/${input.filename}`] = input.content
    return acc
  },
  {} as Record<string, string>
)
