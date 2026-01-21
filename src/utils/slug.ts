import { generatePath } from 'react-router-dom'

export function slugFromPath(filePath: string): string {
  const fileName = filePath.split('/').pop() || ''
  return fileName.replace(/\.md$/, '')
}

export function notePath(slug: string): string {
  return generatePath('/notes/:slug', { slug })
}
