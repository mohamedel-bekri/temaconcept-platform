import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Logo } from '../components/layout/Logo'
import { Button } from '../components/ui/Button'

export function SignIn() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (user) navigate('/espace', { replace: true })
  }, [user, navigate])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy) return

    setBusy(true)
    setError('')
    try {
      await login(email, password)
      navigate('/espace', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : 'Identifiants incorrects.',
      )
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 text-brume lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-acier) 1px, transparent 1px), linear-gradient(90deg, var(--color-acier) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.07,
          }}
        />
        <Link
          to="/"
          className="relative z-10 flex items-center gap-3"
          aria-label="Retour au site"
        >
          <Logo variant="dark" markSize={40} />
        </Link>

        <div className="relative z-10">
          <p className="kicker text-brume/60">Espace client / admin</p>
          <p className="display mt-5 max-w-md text-4xl">
            Vos projets, vos leads,
            <br />
            en un seul système.
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-brume/60">
            Suivi des demandes, table de leads pour l'équipe, historique des
            échanges avec Lina. Le même standard que celui que nous livrons à
            nos clients.
          </p>
        </div>

        <p className="relative z-10 font-mono text-[11px] uppercase tracking-[0.2em] text-brume/40">
          © {new Date().getFullYear()} TEMACONCEPT
        </p>
      </aside>

      <main className="flex items-center justify-center bg-brume px-6 py-16">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-10 flex items-center gap-3 lg:hidden"
            aria-label="Retour au site"
          >
            <Logo variant="light" markSize={36} />
          </Link>

          <h1 className="display text-3xl text-ink">Se connecter</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Accédez à l'espace client et à l'administration.
          </p>

          <form onSubmit={onSubmit} className="panel mt-8 space-y-5 p-6">
            <div className="field">
              <label className="field-label" htmlFor="signin-email">
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                required
                autoComplete="email"
                className="input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="vous@entreprise.ma"
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="signin-password">
                Mot de passe
              </label>
              <input
                id="signin-password"
                type="password"
                required
                autoComplete="current-password"
                className="input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p
                className="border border-danger/30 bg-danger/10 px-4 py-3 font-mono text-xs text-danger"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <Button type="submit" variant="primary" className="w-full" disabled={busy}>
              {busy ? 'Connexion…' : 'Se connecter'}
            </Button>

            <div className="border-t border-verre-dark pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-acier">
                Comptes de démonstration
              </p>
              <ul className="mt-2 space-y-1 font-mono text-xs text-ink-muted">
                <li>admin@temaconcept.com — mot de passe : password</li>
                <li>client@temaconcept.com — mot de passe : password</li>
              </ul>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
