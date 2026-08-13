import { cn } from '../../lib/cn'

const ASPECT_RATIO = 320 / 96

interface LogoProps {
  /** Conservé pour compatibilité : le lockup officiel ne change pas de teinte. */
  variant?: 'light' | 'dark'
  /** Hauteur du lockup (largeur dérivée du ratio officiel 320×96). */
  markSize?: number
  /** Conservé pour compatibilité : le lockup officiel inclut le wordmark. */
  markOnly?: boolean
  className?: string
}

/**
 * Logo officiel TEMACONCEPT (fichier fourni par l'entreprise) :
 * lockup marque + wordmark, affiché tel quel sur tous les fonds.
 */
export function Logo({
  markSize = 36,
  className,
}: LogoProps) {
  const height = markSize
  const width = Math.round(markSize * ASPECT_RATIO)

  return (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src="/logo-dark.png"
        alt="TEMACONCEPT"
        className="block h-auto max-w-full shrink-0"
        style={{ height, width }}
      />
    </span>
  )
}
