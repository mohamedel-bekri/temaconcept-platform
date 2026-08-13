import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type SectionBg = 'none' | 'white' | 'verre' | 'ink' | 'tinted'

interface SectionProps {
  id?: string
  /** `ink` ajoute `text-brume` pour le contenu sur fond sombre. */
  bg?: SectionBg
  className?: string
  children: ReactNode
}

const BACKGROUND: Record<SectionBg, string> = {
  none: '',
  white: 'bg-white',
  verre: 'bg-verre',
  ink: 'bg-ink text-brume',
  tinted: 'bg-sky-fade',
}

/**
 * Rythme vertical standard des sections : 80 px, 112 px à partir de `md`.
 * Remplacer les `<section className="py-20 md:py-28 …">` par ce composant
 * pour unifier la cadence de toutes les pages.
 */
export function Section({ id, bg = 'none', className, children }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', BACKGROUND[bg], className)}>
      {children}
    </section>
  )
}
