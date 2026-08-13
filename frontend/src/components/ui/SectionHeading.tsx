import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  kicker: string
  title: ReactNode
  lede?: ReactNode
  dark?: boolean
  /** `center` : titre + lede centrés (hero de section). */
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  kicker,
  title,
  lede,
  dark = false,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'mb-12 max-w-3xl md:mb-16',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p className={cn('kicker', dark ? 'text-brume/90' : 'text-ink/75')}>
        {kicker}
      </p>
      <h2
        className={cn(
          'display mt-4 text-3xl md:text-5xl',
          dark ? 'text-brume' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            'lede mt-5 max-w-2xl',
            align === 'center' && 'mx-auto',
            dark && 'text-brume/90',
          )}
        >
          {lede}
        </p>
      ) : null}
    </Reveal>
  )
}
