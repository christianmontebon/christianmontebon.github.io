import helloWorldRaw from './notes/hello-world.md?raw'
import simpleBashScriptToImportDatabaseSafelyRaw from './notes/simple-bash-script-to-import-database-safely.md?raw'
import howIBuildThingsRaw from './notes/how-i-build-things.md?raw'
import usingAIWithoutLosingControlRaw from './notes/using-ai-without-losing-control.md?raw'
import { slugFromPath } from '../utils/slug'

export type Note = {
  path: string
  title: string
  tags: string[]
  slug: string
}

export const notes: Note[] = [
  {
    path: 'data/notes/hello-world.md',
    title: 'Hello World',
    tags: ['intro', 'personal'],
    slug: slugFromPath('data/notes/hello-world.md'),
  },
  {
    path: 'data/notes/simple-bash-script-to-import-database-safely.md',
    title: 'Simple Bash Script to Import Database Safely',
    tags: ['demo', 'formatting'],
    slug: slugFromPath('data/notes/simple-bash-script-to-import-database-safely.md'),
  },
  {
    path: 'data/notes/how-i-build-things.md',
    title: 'How I Build Things',
    tags: ['demo', 'formatting'],
    slug: slugFromPath('data/notes/how-i-build-things.md'),
  },
  {
    path: 'data/notes/using-ai-without-losing-control.md',
    title: 'Using AI Without Losing Control',
    tags: ['demo', 'formatting'],
    slug: slugFromPath('data/notes/using-ai-without-losing-control.md'),
  },
]

export const noteContentByPath: Record<string, string> = {
  'data/notes/hello-world.md': helloWorldRaw,
  'data/notes/simple-bash-script-to-import-database-safely.md': simpleBashScriptToImportDatabaseSafelyRaw,
  'data/notes/how-i-build-things.md': howIBuildThingsRaw,
  'data/notes/using-ai-without-losing-control.md': usingAIWithoutLosingControlRaw,
}

