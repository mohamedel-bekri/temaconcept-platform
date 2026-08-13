import type { Service } from '../../types'
import { ICONS } from '../signature/ServiceIcons'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

export function ServicesAccordion({
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
          kicker="Services"
          title={
            <>
              Le détail,
              <br />
              ligne par ligne.
            </>
          }
          lede="Ouvrez une offre pour voir exactement ce que vous obtenez."
        />

        <div className="border-t border-verre-dark">
          {services.map((service, index) => {
            const open = index === 0
            const Icon = ICONS[service.icon] ?? ICONS.code

            return (
              <details key={service.code} className="group border-b border-verre-dark" open={open}>
                <summary className="flex w-full cursor-pointer list-none items-center gap-5 py-6 transition-colors duration-200 hover:bg-sky-fade/50 md:gap-8 md:py-7">
                  <span className="hidden h-11 w-11 shrink-0 items-center justify-center border border-verre-dark text-acier transition-colors group-open:border-ink group-open:text-ink md:flex">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-acier md:text-sm">SERVICE {service.code}</span>
                  <span className="flex-1">
                    <span className="font-display text-xl font-extrabold tracking-tight text-ink transition-colors group-open:text-ink md:text-2xl">
                      {service.name}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-2xl font-light text-acier transition-transform duration-300 group-open:rotate-45 group-open:text-ink"
                  >
                    +
                  </span>
                </summary>

                <div className="grid gap-6 pb-8 pl-0 md:grid-cols-[1fr_auto] md:pl-20">
                  <div>
                    <p className="lede">{service.description}</p>
                    <ul className="mt-5 grid gap-2 md:grid-cols-2">
                      {service.bullets?.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-baseline gap-2.5 text-sm text-ink/80"
                        >
                          <span aria-hidden="true" className="text-ink">
                            ▸
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col items-start justify-between gap-6 md:items-end">
                    <p className="max-w-xs font-mono text-xs leading-relaxed text-acier">
                      {service.tagline}
                    </p>
                    <Button variant="ghost" size="sm" onClick={onChat}>
                      Parler à Lina
                    </Button>
                  </div>
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
