import { useSite } from '../hooks/useSite'
import { PageHero } from '../components/layout/PageHero'
import { ProjectGrid } from '../components/sections/ProjectGrid'
import { Section } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'

export function Realisations() {
  const { site } = useSite()
  if (!site) return null

  return (
    <>
      <PageHero
        kicker="RÉALISATIONS"
        title={
          <>
            Des systèmes en service,
            <br />
            pas des photos d'écran.
          </>
        }
        lede={`Une sélection parmi les ${site.meta.projects} systèmes livrés — clients anonymisés.`}
      />

      <Section bg="tinted">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-acier">
                Confidentialité & Engagements
              </p>
              <blockquote className="font-display mt-4 text-xl italic font-medium leading-relaxed text-ink md:text-2xl">
                « Les noms de nos clients restent dans nos archives. La preuve d'un
                bon projet, c'est un système qui tourne encore — pas un logo sur
                une carte. »
              </blockquote>
              <p className="mt-4 text-sm leading-relaxed text-ink/75 md:text-base">
                Chaque système livré est documenté et reste supervisé : quand il
                est critique, quelqu'un regarde l'écran.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <ProjectGrid projects={site.projects} />
    </>
  )
}
