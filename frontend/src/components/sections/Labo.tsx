import type { Visual } from '../../types'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

const CAPTIONS: Record<string, { title: string; body: string }> = {
  'labo-team': {
    title: 'L\u2019équipe',
    body: 'Des ingénieurs qui font à la fois de la veille et du terrain : la technologie testée en laboratoire est la technologie livrée en production.',
  },
  'labo-whiteboard': {
    title: 'Le prototype',
    body: 'Chaque idée passe d\u2019abord au tableau blanc. On prototype, on mesure, on jette ce qui ne tient pas — avant d\u2019engager une ligne de code.',
  },
  'labo-security': {
    title: 'La sécurité',
    body: 'Supervision, sauvegardes, durcissement : on teste nos propres infrastructures comme celles de nos clients. La sécurité se pratique, elle ne se promet pas.',
  },
}

export function Labo({ visuals }: { visuals: Visual[] }) {
  return (
    <Section id="labo">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          kicker="Labo"
          title={
            <>
              Le labo TEMA :
              <br />
              on teste avant de promettre.
            </>
          }
          lede="Un coin d'atelier, des prototypes, une veille active sur l'IA. C'est ici que les briques de demain sont évaluées avant d'être proposées."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {visuals.map((visual, index) => {
            const caption = CAPTIONS[visual.key]

            return (
              <Reveal key={visual.key} delay={index * 110}>
                <article className="group overflow-hidden border border-verre-dark bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={visual.url}
                      alt={visual.alt}
                      loading="lazy"
                      className="proj-media h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-ink">
                      {caption?.title ?? 'Labo TEMA'}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {caption?.body ?? visual.alt}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
