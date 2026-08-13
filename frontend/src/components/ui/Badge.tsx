import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BadgeTone =
  | 'neutral'
  | 'accent'
  | 'info'
  | 'outline'
  | 'outline-dark'
  | 'overlay'
  | 'success'
  | 'warning'
  | 'danger'

interface BadgeProps {
  /** `neutral` plein marine ; `outline` / `outline-dark` sur fond clair/sombre ;
   *  `overlay` par-dessus une image ; `success|warning|danger` = états. */
  tone?: BadgeTone
  className?: string
  children: ReactNode
}

const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-ink text-brume',
  accent: 'bg-azure text-ink',
  info: 'bg-ink/10 text-ink',
  outline: 'border border-verre-dark bg-white text-ink-muted',
  'outline-dark': 'border border-brume/20 bg-transparent text-brume/75',
  overlay: 'bg-ink/85 text-brume/85 backdrop-blur-sm',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
}

/** Petit libellé « système » : tag, secteur, statut, chip de valeur. */
export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
