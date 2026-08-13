import type { Project } from '../../types'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { ProjectCard } from '../projects/ProjectCard'

/**
 * Une sélection éditoriale : le premier projet porte la lecture, les suivants
 * complètent le récit sans reproduire une grille de cartes uniforme.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [featured, ...remaining] = projects
  const secondary = remaining.slice(0, 2)
  const archive = remaining.slice(2)

  if (!featured) return null

  return (
    <Section id="projets" bg="ink" className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mb-14 grid gap-6 border-b border-brume/15 pb-10 md:mb-16 md:grid-cols-[minmax(0,1fr)_20rem] md:items-end">
          <div className="max-w-3xl">
            <p className="kicker text-brume/80">Réalisations</p>
            <h2 className="display mt-4 text-3xl text-brume md:text-5xl">
              Projets livrés,
              <br />
              conçus pour durer.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-brume/70 md:pb-1">
            Une sélection de solutions développées pour répondre à des usages métier concrets.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <ProjectCard project={featured} variant="featured" />
          </Reveal>

          {secondary.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-10">
              {secondary.map((project, index) => (
                <Reveal key={project.id} delay={(index + 1) * 90}>
                  <ProjectCard project={project} variant="secondary" />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>

        {archive.length > 0 ? (
          <div className="mt-14 grid gap-x-8 gap-y-12 border-t border-brume/15 pt-10 md:grid-cols-2 lg:grid-cols-3">
            {archive.map((project, index) => (
              <Reveal key={project.id} delay={(index % 3) * 90}>
                <ProjectCard project={project} variant="compact" />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  )
}
