import type { Project } from '../../types'
import { cn } from '../../lib/cn'

type ProjectCardVariant = 'featured' | 'secondary' | 'compact'

interface ProjectCardProps {
  project: Project
  variant?: ProjectCardVariant
}

/** Carte de projet volontairement sobre : secteur, année, réalisation et domaines. */
export function ProjectCard({ project, variant = 'compact' }: ProjectCardProps) {
  const metadata = [project.sector, project.year].filter(Boolean).join(' · ')
  const tags = project.tags?.slice(0, variant === 'featured' ? 4 : 3) ?? []

  return (
    <article className={cn('project-entry group', `project-entry--${variant}`)}>
      <div className="project-entry__media relative overflow-hidden bg-ink-soft">
        <img
          src={project.image_url || '/images/placeholder.svg'}
          alt={project.summary}
          loading="lazy"
          className="project-entry__image h-full w-full object-cover"
        />
        <div aria-hidden="true" className="project-entry__veil absolute inset-0" />
      </div>

      <div className="pt-5">
        {metadata ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brume/60">
            {metadata}
          </p>
        ) : null}
        <h3 className="project-entry__title mt-2 font-display font-extrabold tracking-tight text-brume">
          {project.title}
        </h3>
        <p className="project-entry__summary mt-3 leading-relaxed text-brume/70">{project.summary}</p>
        {tags.length > 0 ? (
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-azure/90">
            {tags.join(' · ')}
          </p>
        ) : null}
      </div>
    </article>
  )
}
