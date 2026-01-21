import { useEffect, useMemo, useState } from 'react'

type Options = {
  typeMs?: number
  eraseMs?: number
  pauseAtFullMs?: number
  pauseAtEmptyMs?: number
  startDelayMs?: number
}

export function useTypewriterNotes(notes: string[], opts: Options = {}) {
  const {
    typeMs = 45,
    eraseMs = 28,
    pauseAtFullMs = 1200,
    pauseAtEmptyMs = 400,
    startDelayMs = 400,
  } = opts

  const stableNotes = useMemo(() => notes.filter(Boolean), [notes])
  const [noteIndex, setNoteIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setStarted(true), startDelayMs)
    return () => window.clearTimeout(id)
  }, [startDelayMs])

  useEffect(() => {
    if (!started || stableNotes.length === 0) return

    const current = stableNotes[noteIndex % stableNotes.length]
    let timeout = 0

    if (!isDeleting && charIndex < current.length) {
      timeout = window.setTimeout(() => setCharIndex(ci => ci + 1), typeMs)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = window.setTimeout(() => setIsDeleting(true), pauseAtFullMs)
    } else if (isDeleting && charIndex > 0) {
      timeout = window.setTimeout(() => setCharIndex(ci => ci - 1), eraseMs)
    } else if (isDeleting && charIndex === 0) {
      timeout = window.setTimeout(() => {
        setIsDeleting(false)
        setNoteIndex(i => (i + 1) % stableNotes.length)
      }, pauseAtEmptyMs)
    }

    return () => window.clearTimeout(timeout)
  }, [
    started,
    stableNotes,
    noteIndex,
    charIndex,
    isDeleting,
    typeMs,
    eraseMs,
    pauseAtFullMs,
    pauseAtEmptyMs,
  ])

  const text =
    stableNotes.length === 0
      ? ''
      : stableNotes[noteIndex % stableNotes.length].slice(0, charIndex)

  return { text, isDeleting }
}
