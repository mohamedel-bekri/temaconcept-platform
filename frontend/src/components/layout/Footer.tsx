import { Link } from 'react-router-dom'
import type { SiteMeta } from '../../types'
import { Logo } from './Logo'

export function Footer({ meta }: { meta: SiteMeta }) {
  return (
    <footer className="bg-ink text-brume">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 text-center md:px-10">
        <Link to="/" aria-label="TEMACONCEPT — retour à l'accueil">
          <Logo variant="dark" markSize={40} />
        </Link>
        <div className="space-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brume/60">
          <p>{meta.address}</p>
          <p>© {new Date().getFullYear()} TEMACONCEPT — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}
