import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/cn'

/** Trait horizontal qui se dessine à l'entrée dans le viewport. */
export function RevealDraw({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('reveal-draw', inView && 'is-in', className)}
    />
  )
}
