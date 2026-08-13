import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonTone = 'light' | 'dark'
type ButtonSize = 'md' | 'sm'

interface ButtonBaseProps {
  /** `primary` = fond marine ; `secondary` = azure (clair) / blanc (sombre) ; `ghost` = contour. */
  variant?: ButtonVariant
  /** `dark` : variante conçue pour un fond sombre (ex. hero, footer, CTABand). */
  tone?: ButtonTone
  size?: ButtonSize
  className?: string
  children: ReactNode
}

interface ButtonLinkProps extends ButtonBaseProps {
  to: string
  href?: undefined
  onClick?: () => void
}

interface ButtonAnchorProps extends ButtonBaseProps {
  href: string
  to?: undefined
  onClick?: () => void
}

interface ButtonNativeProps extends ButtonBaseProps {
  to?: undefined
  href?: undefined
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
  onClick?: () => void
}

export type ButtonProps = ButtonLinkProps | ButtonAnchorProps | ButtonNativeProps

/** Style commun : mono, majuscules espacées, même gabarit pour tous les types. */
const BASE =
  'inline-flex items-center justify-center gap-3 px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-200'

const SIZE: Record<ButtonSize, string> = {
  md: 'px-6 py-3.5',
  sm: 'px-4 py-2 text-xs',
}

/** Interdiction de survol/relief quand le bouton natif est désactivé. */
const DISABLED =
  'disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0'

const VARIANTS: Record<ButtonVariant, { light: string; dark: string }> = {
  primary: {
    light:
      'bg-ink text-brume shadow-[4px_4px_0_0_var(--color-verre-dark)] hover:bg-ink-soft hover:shadow-[6px_6px_0_0_var(--color-verre-dark)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-verre-dark)]',
    dark: 'bg-ink text-brume shadow-[4px_4px_0_0_rgb(0_0_0/0.35)] hover:bg-ink-soft hover:shadow-[6px_6px_0_0_rgb(0_0_0/0.35)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_rgb(0_0_0/0.35)]',
  },
  secondary: {
    light:
      'bg-azure text-ink shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-azure/85 hover:shadow-[6px_6px_0_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-ink)]',
    dark: 'bg-brume text-ink shadow-[4px_4px_0_0_var(--color-ink)] hover:bg-white hover:shadow-[6px_6px_0_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-ink)]',
  },
  ghost: {
    light:
      'border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-brume active:bg-ink-soft active:border-ink-soft active:text-brume disabled:hover:border-ink/25 disabled:hover:bg-transparent disabled:hover:text-ink',
    dark: 'border border-brume/35 bg-transparent text-brume hover:border-brume hover:bg-brume hover:text-ink active:bg-brume/85 active:border-brume active:text-ink disabled:hover:border-brume/35 disabled:hover:bg-transparent disabled:hover:text-brume',
  },
}

/**
 * Bouton unique du design system. Rendu automatique :
 * `<Link>` si `to`, `<a>` si `href`, sinon `<button>`.
 * Les anciennes classes `.btn*` (index.css) sont supprimées : toujours passer
 * par ce composant.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    tone = 'light',
    size = 'md',
    className,
    children,
  } = props
  const classes = cn(BASE, SIZE[size], VARIANTS[variant][tone], DISABLED, className)

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} onClick={props.onClick} className={classes}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href !== undefined) {
    return (
      <a href={props.href} onClick={props.onClick} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      disabled={props.disabled}
      aria-label={props['aria-label']}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  )
}
