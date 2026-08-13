import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Button } from '../../components/ui/Button'

interface Slide {
  tagline: string
  title: ReactNode
  lede: string
}

const SLIDES: Slide[] = [
  {
    tagline: 'Ingénierie & Développement',
    title: (
      <>
        On conçoit les systèmes
        <br />
        <span className="text-azure">qu'on déploie.</span>
      </>
    ),
    lede: "De l'analyse du besoin à la supervision, un seul interlocuteur responsable.",
  },
  {
    tagline: 'Sur mesure',
    title: (
      <>
        Des logiciels faits
        <br />
        <span className="text-azure">pour votre métier.</span>
      </>
    ),
    lede: "On n'adapte pas un produit générique : on construit l'outil exact dont vous avez besoin.",
  },
  {
    tagline: 'Expérience',
    title: (
      <>
        La preuve, ce sont
        <br />
        <span className="text-azure">des systèmes en service.</span>
      </>
    ),
    lede: 'Nos clients restent discrets, mais les projets livrés continuent de tourner.',
  },
  {
    tagline: 'Proximité',
    title: (
      <>
        Une équipe à Témara,
        <br />
        <span className="text-azure">proche de vous.</span>
      </>
    ),
    lede: 'À quinze minutes de Rabat, nous venons échanger directement dans vos locaux.',
  },
]

const AUTOPLAY_MS = 6000

interface HeroProps {
  onChat: () => void
}

export function Hero({ onChat }: HeroProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      AUTOPLAY_MS,
    )
    return () => window.clearInterval(id)
  }, [paused])

  const go = (target: number) =>
    setIndex((target + SLIDES.length) % SLIDES.length)

  const slide = SLIDES[index]

  return (
    <section
      id="accueil"
      className={cn(
        'relative flex min-h-screen flex-col overflow-hidden bg-ink text-brume',
        paused && 'hero-paused',
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Background layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#06324c_0%,#000b13_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_76%_26%,rgb(77_169_217/0.25),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-acier) 1px, transparent 1px), linear-gradient(90deg, var(--color-acier) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          opacity: 0.05,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl flex-1 px-6 pb-16 pt-36 md:px-10 lg:pt-32">
        <div key={index} className="hero-slide-enter relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-azure">
            {slide.tagline}
          </p>

          <h1 className="display mt-5 text-[clamp(2.4rem,5.5vw,4.2rem)] text-brume">
            {slide.title}
          </h1>
          <p className="lede mt-6 max-w-xl text-brume/85">{slide.lede}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="secondary" onClick={onChat}>
              Parler à Lina
            </Button>
            <Button variant="ghost" tone="dark" to="/realisations">
              <span className="group inline-flex items-center gap-2">
                Nos réalisations
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Button>
          </div>

          {/* Progress bar navigation */}
          <div className="mt-12 flex items-center gap-2">
            {SLIDES.map((item, dot) => (
              <button
                key={item.tagline}
                type="button"
                onClick={() => go(dot)}
                aria-label={`Diapositive ${dot + 1} — ${item.tagline}`}
                aria-current={dot === index}
                className="group relative h-1 flex-1 max-w-16 overflow-hidden rounded-full bg-brume/15 transition-all duration-300"
              >
                {dot === index ? (
                  <span className="hero-progress absolute inset-y-0 left-0 rounded-full bg-azure" />
                ) : dot < index ? (
                  <span className="absolute inset-0 rounded-full bg-brume/40" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
