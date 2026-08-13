import { useSite } from '../hooks/useSite'
import { PageHero } from '../components/layout/PageHero'
import { Counter } from '../components/ui/Counter'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { Method } from '../components/sections/Method'
import { Labo } from '../components/sections/Labo'

const ABOUT_CAPTIONS: Record<string, { title: string; body: string }> = {
  'about-facade': {
    title: 'Un standard, depuis 2009',
    body: 'Des bureaux à Témara, une exigence qui ne varie pas : livrer des systèmes qui tournent et qui se maintiennent.',
  },
  'about-atelier': {
    title: 'L\u2019atelier',
    body: 'Nos ingénieurs conçoivent et développent dans l\u2019atelier — la même méthode pour nos clients et pour nous.',
  },
  'about-team': {
    title: 'L\u2019équipe',
    body: 'Une équipe à taille humaine, des compétences couvrant tout le cycle : cadrage, développement, infrastructure, data.',
  },
}

export function About() {
  const { site } = useSite()
  if (!site) return null

  const visuals = site.visuals['about'] ?? []
  const [first, ...rest] = visuals

  return (
    <>
      <PageHero
        kicker="À PROPOS"
        title={
          <>
            Une agence d'ingénierie,
            <br />
            pas une usine à sites.
          </>
        }
        lede={`Ingénierie informatique au Maroc depuis ${site.meta.years} ans. ${site.meta.projects} systèmes livrés, toujours opérationnels.`}
      />

      {/* Company overview + photo grid */}
      <Section>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="kicker">À propos</p>
              <h2 className="display mt-4 text-3xl text-ink md:text-5xl">
                Un système se juge
                <br />
                à l'usage, pas à la démo.
              </h2>
              <p className="lede mt-6">
                Une équipe d'ingénieurs installée à Témara, qui travaille au
                contact des entreprises marocaines. On confronte la méthode aux
                budgets et aux délais réels — pas à des cas d'école.
              </p>
              <p className="mt-5 leading-relaxed text-ink/75">
                Notre force, c'est une méthode : on ne code pas tant que le
                cadrage n'est pas validé, on ne livre pas sans votre accord —
                et une fois en production, on reste.
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-verre-dark pt-8">
                <div>
                  <dt className="kicker">Années</dt>
                  <dd className="font-display text-4xl font-black text-ink">
                    <Counter to={site.meta.years} suffix=" ans" />
                  </dd>
                </div>
                <div>
                  <dt className="kicker">Systèmes</dt>
                  <dd className="font-display text-4xl font-black text-ink">
                    <Counter to={site.meta.projects} />
                  </dd>
                </div>
                <div>
                  <dt className="kicker">Supervision</dt>
                  <dd className="font-display text-4xl font-black text-ink">24/7</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {first ? (
              <Reveal>
                <figure className="overflow-hidden border border-verre-dark bg-white">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={first.url}
                      alt={first.alt}
                      loading="lazy"
                      className="proj-media h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="p-5">
                    <p className="font-display text-lg font-extrabold text-ink">
                      {ABOUT_CAPTIONS[first.key]?.title ?? 'TEMACONCEPT'}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {ABOUT_CAPTIONS[first.key]?.body ?? first.alt}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              {rest.map((visual, index) => (
                <Reveal key={visual.key} delay={index * 110}>
                  <figure className="overflow-hidden border border-verre-dark bg-white">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={visual.url}
                        alt={visual.alt}
                        loading="lazy"
                        className="proj-media h-full w-full object-cover"
                      />
                    </div>
                    <figcaption className="p-4">
                      <p className="font-display text-base font-extrabold text-ink">
                        {ABOUT_CAPTIONS[visual.key]?.title ?? 'TEMACONCEPT'}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
                        {ABOUT_CAPTIONS[visual.key]?.body ?? visual.alt}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Method />

      <Section>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
              {/* Left column (Asymmetric 5 cols): Kicker, Heading, and Pull Quote with attribution */}
              <div className="lg:col-span-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-acier">
                  Valeurs & rigueur
                </p>
                <h2 className="display mt-3 text-3xl font-extrabold text-ink md:text-4xl">
                  Ce à quoi nous tenons
                </h2>

                <div className="mt-8 border-l border-azure pl-6">
                  <blockquote className="font-serif text-lg italic leading-relaxed text-ink/90">
                    « Nous ne considérons pas la livraison comme la fin d'un projet, mais comme le début de l'usage. »
                  </blockquote>
                  <p className="mt-4 font-mono text-xs uppercase tracking-wider text-acier">
                    <span className="normal-case text-ink/60">Direction technique</span>
                  </p>
                </div>
              </div>

              {/* Right column (Asymmetric 7 cols): Editorial prose with hairline dividers */}
              <div className="lg:col-span-7 lg:pt-2">
                <div className="space-y-8 text-base leading-relaxed text-ink/80 md:text-lg">
                  <div className="pb-8 border-b border-verre-dark/60">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-ink mb-2">
                      Durabilité
                    </p>
                    <p>
                      Un logiciel bien construit doit se faire oublier : tourner sans interruption, évoluer sans refonte, et ne jamais freiner votre activité.
                    </p>
                  </div>

                  <div className="pb-8 border-b border-verre-dark/60">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-ink mb-2">
                      Documentation
                    </p>
                    <p>
                      Architecture, décisions techniques, procédures de déploiement : tout est écrit et transmis. N'importe quel ingénieur doit pouvoir reprendre le projet sans friction.
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-ink mb-2">
                      Transparence
                    </p>
                    <p>
                      Vous savez à tout moment où en est le chantier, ce qui a changé et ce que cela coûte, sans discours superflus ni promesses en l'air.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Labo visuals={site.visuals['labo'] ?? []} />
    </>
  )
}
