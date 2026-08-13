import type { ReactNode } from 'react'
import type { SiteMeta } from '../../types'
import { Reveal } from '../../components/ui/Reveal'
import { Counter } from '../../components/ui/Counter'
import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'

interface Stat {
  value: ReactNode
  label: string
}

export function Performance({ meta }: { meta: SiteMeta }) {
  const stats: Stat[] = [
    { value: <Counter to={100} suffix="%" />, label: 'Satisfaction client' },
    { value: <Counter to={meta.projects} suffix="+" />, label: 'Systèmes livrés' },
    { value: '24/7', label: 'Supervision & suivi' },
    { value: <Counter to={meta.years} suffix=" ans" />, label: "D'expérience au Maroc" },
  ]

  return (
    <Section id="performance" bg="tinted">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <SectionHeading
          align="center"
          kicker="RELIABILITÉ"
          title={
            <>
              Des repères concrets,
              <br />
              sur le terrain.
            </>
          }
        />

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 110}>
              <div className="panel p-6 text-center md:p-8">
                <p className="font-display text-4xl font-black tracking-tight text-ink md:text-5xl lg:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-acier">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
