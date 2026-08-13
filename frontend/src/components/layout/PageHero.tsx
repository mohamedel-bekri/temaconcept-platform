import type { ReactNode } from 'react'

interface PageHeroProps {
  kicker: string
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}

/**
 * Héro sombre standard des pages internes : grille système en fond,
 * halo signal, kicker + titre display. Le bandeau suit le nav
 * transparent (logo clair) puis se laisse recouvrir au scroll.
 */
export function PageHero({ kicker, title, lede, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink text-brume">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-acier) 1px, transparent 1px), linear-gradient(90deg, var(--color-acier) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          opacity: 0.07,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_78%_30%,rgb(77_169_217/0.24),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
        <p className="kicker text-brume/90">{kicker}</p>
        <h1 className="display mt-6 max-w-4xl text-[clamp(2rem,4.5vw,3.4rem)]">{title}</h1>
        {lede ? <p className="lede mt-6 max-w-2xl text-brume">{lede}</p> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  )
}
