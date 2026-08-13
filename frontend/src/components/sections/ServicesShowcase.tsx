import { Link } from 'react-router-dom'
import type { Service } from '../../types'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'

const SERVICE_IMAGES: Record<string, string> = {
  '01': '/images/about-atelier.jpg',
  '02': '/images/project-mobile.jpg',
  '03': '/images/project-server.jpg',
  '04': '/images/labo-security.jpg',
  '05': '/images/labo-whiteboard.jpg',
  '06': '/images/project-logistics.jpg',
}

export function ServicesShowcase({
  services,
  onChat,
}: {
  services: Service[]
  onChat: () => void
}) {
  return (
    <Section id="services" bg="white">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          kicker="NOS ENGAGEMENTS"
          title={
            <>
              Le détail de nos prestations,
              <br />
              conçues pour la performance.
            </>
          }
          lede="Chaque service est pensé comme un composant d'ingénierie fiable, maintenable et aligné sur vos processus métiers."
        />

        <div className="border-t border-verre-dark">
          {services.map((service, index) => {
            const flip = index % 2 === 1
            const image = SERVICE_IMAGES[service.code]

            return (
              <article
                key={service.code}
                className="grid gap-10 border-b border-verre-dark py-14 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16"
              >
                <Reveal className={flip ? 'lg:order-2' : undefined}>
                  <div className="group relative overflow-hidden rounded-lg border border-verre-dark bg-brume shadow-panel transition-transform duration-300 hover:-translate-y-1">
                    {image ? (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={image}
                          alt={service.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <span className="absolute left-4 top-4 rounded border border-white/20 bg-ink/90 px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brume shadow-sm backdrop-blur-md">
                      SERVICE {service.code}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={100} className={flip ? 'lg:order-1' : undefined}>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-strong">
                    {service.tagline}
                  </p>
                  <h3 className="display mt-3 text-3xl text-ink md:text-4xl">
                    {service.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink/80">
                    {service.description}
                  </p>

                  {service.bullets?.length ? (
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-3 rounded-md border border-verre-dark bg-brume px-3.5 py-2.5 text-xs font-medium text-ink transition-colors hover:border-azure/60"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 shrink-0 text-accent-strong"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-9 flex flex-wrap items-center gap-5 pt-2">
                    <Button variant="secondary" size="sm" onClick={onChat}>
                      Parler à Lina
                    </Button>
                    <Link
                      to="/realisations"
                      className="group inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-strong transition-colors hover:text-ink"
                    >
                      <span>Voir les réalisations</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
