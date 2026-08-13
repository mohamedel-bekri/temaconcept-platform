import { Link } from 'react-router-dom'
import type { Service } from '../../types'
import { ICONS } from '../signature/ServiceIcons'

/**
 * Carte service (grille d'accueil) : code système, icône, nom, pitch et lien.
 * Lien « Voir le détail » en `accent-strong` : l'azure clair échoue au
 * contraste AA sur fond blanc (2.4:1), la version assombrie passe à 7:1.
 */
export function ServiceCard({
  service,
  image,
}: {
  service: Service
  image?: string
}) {
  const Icon = ICONS[service.icon] ?? ICONS.code

  return (
    <Link
      to="/services"
      className="group relative flex h-full flex-col overflow-hidden border border-verre-dark bg-white transition-all duration-300 hover:-translate-y-1 hover:border-azure hover:shadow-panel"
    >
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/70">
            SERVICE {service.code}
          </span>
          <span className="flex h-10 w-10 items-center justify-center border border-verre-dark text-acier transition-colors group-hover:border-azure group-hover:bg-azure/10 group-hover:text-accent-strong">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
        <h3 className="display mt-5 text-2xl text-ink">{service.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
          {service.tagline}
        </p>
        <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-strong">
          Voir le détail →
        </span>
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-azure transition-transform duration-300 group-hover:scale-x-100"
      />
    </Link>
  )
}
