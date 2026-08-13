import type { SiteMeta } from '../../types'
import { Reveal } from '../../components/ui/Reveal'
import { Counter } from '../../components/ui/Counter'
import { Section } from '../../components/ui/Section'
import { Button } from '../../components/ui/Button'

export function NotreObjectif({ meta }: { meta: SiteMeta }) {
  return (
    <Section id="objectif" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        
        {/* Asymmetric Editorial Layout */}
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-20">

          {/* LEFT COLUMN (5 cols): Immersive visual & editorial quote */}
          <Reveal className="lg:col-span-5">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden border border-verre-dark">
                <img
                  src="/images/about-team.jpg"
                  alt="L'équipe d'ingénierie TEMACONCEPT à Témara"
                  loading="lazy"
                  className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
                <span className="absolute bottom-4 left-4 bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-brume">
                  Atelier · Témara
                </span>
              </div>

              <div className="mt-8 border-l border-azure pl-6">
                <blockquote className="font-serif text-base italic leading-relaxed text-ink/85 md:text-lg">
                  « Un bon logiciel ne se juge pas le jour de la recette. Il se mesure à la sérénité des équipes deux ans après la livraison. »
                </blockquote>
                <p className="mt-4 font-mono text-xs uppercase tracking-wider text-acier">
                  L'équipe Ingénierie <span className="normal-case text-ink/60">— TEMACONCEPT Maroc</span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* RIGHT COLUMN (7 cols): Narrative & Clean Metric Row */}
          <Reveal delay={120} className="lg:col-span-7">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-acier">
                Notre engagement
              </p>

              <h2 className="display mt-3 text-3xl font-extrabold text-ink md:text-4xl lg:text-[2.6rem] leading-[1.2]">
                Des logiciels conçus par des ingénieurs, accompagnés dans la durée.
              </h2>

              <p className="mt-6 text-base leading-relaxed text-ink/80 md:text-lg">
                Nous construisons des systèmes informatiques sur mesure faits pour résister
                à la charge du quotidien. Du cadrage initial à la mise en production,
                nous formons vos équipes et assurons un suivi continu sans intermédiaire anonyme.
              </p>

              {/* Clean Metric Row with Hairline Dividers (No boxed card) */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-y border-verre-dark/60 py-8">
                <div>
                  <p className="font-display text-3xl font-extrabold text-ink md:text-4xl">
                    <Counter to={meta.projects} suffix="+" />
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-acier">
                    Systèmes en service
                  </p>
                </div>

                <div className="border-x border-verre-dark/60 px-6">
                  <p className="font-display text-3xl font-extrabold text-ink md:text-4xl">
                    <Counter to={meta.years} suffix=" ans" />
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-acier">
                    Expérience terrain
                  </p>
                </div>

                <div className="pl-2">
                  <p className="font-display text-xs font-bold uppercase tracking-wider text-ink pt-2">
                    Présence locale
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-acier">
                    Témara · Rabat · Casa
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <Button to="/contact" variant="primary">
                  Discuter de votre projet
                </Button>
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </Section>
  )
}
