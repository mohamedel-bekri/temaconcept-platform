import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../hooks/useAuth'
import { Logo } from '../components/layout/Logo'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import type { Lead, Paginated } from '../types'

const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'recycled']

const STATUS_LABELS: Record<string, string> = {
  new: 'Nouveau',
  contacted: 'Contacté',
  qualified: 'Qualifié',
  converted: 'Gagné',
  recycled: 'Perdu',
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [query, setQuery] = useState('')
  const [data, setData] = useState<Paginated<Lead> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setData(
        await api.leads({
          status: status || undefined,
          q: query || undefined,
          page,
        }),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger les leads.')
    } finally {
      setLoading(false)
    }
  }, [status, query, page])

  useEffect(() => {
    if (!user) {
      navigate('/connexion', { replace: true })
      return
    }
    if (user.role === 'admin') void load()
  }, [user, navigate, load])

  async function onUpdateStatus(id: number, next: string) {
    await api.updateLeadStatus(id, next)
    void load()
  }

  async function onLogout() {
    await logout()
    navigate('/connexion', { replace: true })
  }

  return (
    <div className="min-h-screen bg-brume">
      <header className="sticky top-0 z-30 border-b border-verre bg-brume/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Retour au site">
            <Logo variant="light" markSize={30} />
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-acier">
              / Espace
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-ink">{user.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-acier">
                    {user.role === 'admin' ? 'Administrateur' : 'Client'}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  Déconnexion
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {!user ? null : user.role === 'admin' ? (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-index">LEADS</p>
                <h1 className="display mt-2 text-3xl text-ink">Table des prospects</h1>
                <p className="mt-2 text-sm text-ink-muted">
                  Les demandes issues du formulaire et de la conversation avec Lina.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Rechercher…"
                  aria-label="Rechercher un lead"
                  className="input w-56"
                />
                <label className="sr-only" htmlFor="lead-status">
                  Filtrer par statut
                </label>
                <select
                  id="lead-status"
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value)
                    setPage(1)
                  }}
                  className="input w-44"
                >
                  <option value="">Tous les statuts</option>
                  {STATUSES.map((value) => (
                    <option key={value} value={value}>
                      {STATUS_LABELS[value]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error ? (
              <p
                className="mt-6 border border-danger/30 bg-danger/10 px-4 py-3 font-mono text-xs text-danger"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div className="mt-6 overflow-x-auto border border-verre-dark bg-white">
              <table className="w-full min-w-[52rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-verre bg-verre font-mono text-[10px] uppercase tracking-[0.16em] text-acier">
                    <th className="px-4 py-3">Prospect</th>
                    <th className="px-4 py-3">Besoin</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Origine</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center font-mono text-xs text-acier">
                        Chargement…
                      </td>
                    </tr>
                  ) : !data || data.data.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-ink-muted">
                        Aucun lead ne correspond à ce filtre.
                      </td>
                    </tr>
                  ) : (
                    data.data.map((lead) => (
                      <tr key={lead.id} className="border-b border-verre last:border-0 hover:bg-verre/40">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-ink">
                            {lead.name ?? 'Anonyme'}
                            {lead.escalated ? (
                              <Badge tone="info" className="ml-2">
                                Escaladé
                              </Badge>
                            ) : null}
                          </p>
                          <p className="font-mono text-xs text-acier">
                            {[lead.company, lead.email, lead.phone].filter(Boolean).join(' · ') || '—'}
                          </p>
                        </td>
                        <td className="max-w-[16rem] px-4 py-3 text-ink/75">
                          <p className="truncate">{lead.need ?? '—'}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono text-sm font-bold text-ink">
                            {lead.score}
                          </span>
                          <span className="text-acier">/100</span>
                        </td>
                        <td className="px-4 py-3">
                          <label className="sr-only" htmlFor={`status-${lead.id}`}>
                            Statut du lead {lead.name ?? lead.id}
                          </label>
                          <select
                            id={`status-${lead.id}`}
                            value={lead.status}
                            onChange={(event) => onUpdateStatus(lead.id, event.target.value)}
                            className="border border-verre-dark bg-brume px-2 py-1.5 font-mono text-xs text-ink"
                          >
                            {STATUSES.map((value) => (
                              <option key={value} value={value}>
                                {STATUS_LABELS[value]}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-acier">
                          {lead.source}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-acier">
                          {formatDate(lead.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {data && data.last_page > 1 ? (
              <div className="mt-5 flex items-center justify-between">
                <p className="font-mono text-xs text-acier">
                  Page {data.current_page} / {data.last_page} — {data.total} leads
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((value) => value - 1)}
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={page >= data.last_page}
                    onClick={() => setPage((value) => value + 1)}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="mx-auto max-w-2xl">
            <p className="section-index">ESPACE CLIENT</p>
            <h1 className="display mt-2 text-3xl text-ink">
              Bonjour, {user.name.split(' ')[0]}.
            </h1>
            <p className="mt-3 leading-relaxed text-ink/70">
              L'espace client complet arrive bientôt : suivi de vos projets,
              historique de vos échanges avec Lina, documents et facturation.
              Pour l'instant, retrouvez les informations essentielles sur le
              site ou contactez directement l'équipe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/">Revenir au site</Button>
              <Button variant="ghost" href="mailto:contact@temaconcept.com">
                Contacter l'équipe
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
