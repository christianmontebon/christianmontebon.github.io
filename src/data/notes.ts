import helloWorldRaw from '../content/notes/hello-world.md?raw'
import simpleBashScriptToImportDatabaseSafelyRaw from '../content/notes/simple-bash-script-to-import-database-safely.md?raw'

export type Note = {
  path: string
  title: string
  tags: string[]
}

export const notes: Note[] = [
  {
    path: 'content/notes/hello-world.md',
    title: 'Hello World',
    tags: ['intro', 'personal'],
  },
  {
    path: 'content/notes/simple-bash-script-to-import-database-safely.md',
    title: 'Simple Bash Script to Import Database Safely',
    tags: ['demo', 'formatting'],
  },
]

export const noteContentByPath: Record<string, string> = {
  'content/notes/hello-world.md': helloWorldRaw,
  'content/notes/simple-bash-script-to-import-database-safely.md': simpleBashScriptToImportDatabaseSafelyRaw,
}

