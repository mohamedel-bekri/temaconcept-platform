import { cn } from '../../lib/cn'

interface RosetteProps {
  className?: string
  animate?: boolean
}

/**
 * Étoile à 8 branches, dérivée de la géométrie zellige :
 * deux carrés imbriqués (45°) + octogone interne.
 * C'est le monogramme animé de la marque.
 */
export function Rosette({ className, animate = true }: RosetteProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={cn('h-full w-full', animate && 'rosette-spin', className)}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="45" y="45" width="110" height="110" />
        <rect x="45" y="45" width="110" height="110" transform="rotate(45 100 100)" />
        <circle cx="100" cy="100" r="44" />
        <circle cx="100" cy="100" r="62" strokeDasharray="3 7" />
        <circle cx="100" cy="100" r="74" strokeWidth="1" strokeOpacity="0.5" />
      </g>
      <circle cx="100" cy="100" r="8" fill="currentColor" />
      <path
        d="M 100 38 L 104 96 L 162 100 L 104 104 L 100 162 L 96 104 L 38 100 L 96 96 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  )
}
