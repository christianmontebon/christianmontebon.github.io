import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export default function Badge({ children, className }: BadgeProps) {
  const baseClasses =
    'relative inline-flex items-center text-xs px-2.5 py-1 rounded-full ' +
    'text-foreground/85 border border-emerald-400/30 dark:border-emerald-300/25 ' +
    'backdrop-blur-sm backdrop-saturate-150 ' +
    'bg-gradient-to-br from-emerald-400/15 via-cyan-400/10 to-sky-400/15 ' +
    'transition-colors hover:from-emerald-400/25 hover:to-sky-400/20 hover:shadow-[0_0_14px_rgba(56,189,248,0.35)]'

  return <span className={`${baseClasses} ${className ?? ''}`}>{children}</span>
}
