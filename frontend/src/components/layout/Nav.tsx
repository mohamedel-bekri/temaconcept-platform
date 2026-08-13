import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import type { SiteMeta } from '../../types'
import { cn } from '../../lib/cn'
import { SITE_LINKS, SOCIALS } from '../../lib/site'
import { Logo } from './Logo'

interface NavProps {
  meta: SiteMeta
}

export function Nav({ meta }: NavProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const overHero = !scrolled && !open
  const linkColor = overHero
    ? 'text-brume/75 hover:text-brume'
    : 'text-ink/70 hover:text-ink'

  return (
    <header
      className={cn(
        'nav-anim fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        overHero
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-verre bg-brume/90 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="TEMACONCEPT — retour à l'accueil"
        >
          <Logo variant={overHero ? 'dark' : 'light'} markSize={34} />
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Navigation principale"
        >
          {SITE_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'group-line font-mono text-xs uppercase tracking-[0.18em] transition-colors',
                  linkColor,
                  isActive && !overHero && 'text-ink',
                  isActive && overHero && 'text-brume',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          {SOCIALS.map(({ label, href, external, Icon }) => (
            <a
              key={label}
              href={href(meta)}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              aria-label={label}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                overHero
                  ? 'text-brume/70 hover:bg-brume/10 hover:text-brume'
                  : 'text-ink-muted hover:bg-ink/5 hover:text-ink',
              )}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span
            className={cn(
              'h-0.5 w-6 transition-transform',
              overHero ? 'bg-brume' : 'bg-ink',
              open && 'translate-y-2 rotate-45',
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 transition-opacity',
              overHero ? 'bg-brume' : 'bg-ink',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'h-0.5 w-6 transition-transform',
              overHero ? 'bg-brume' : 'bg-ink',
              open && '-translate-y-2 -rotate-45',
            )}
          />
        </button>
      </div>

      {open ? (
        <nav
          className="border-t border-verre bg-brume px-6 pb-6 pt-2 lg:hidden"
          aria-label="Navigation mobile"
        >
          {SITE_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block border-b border-verre py-3.5 font-mono text-sm uppercase tracking-[0.18em]',
                  isActive ? 'text-accent-strong' : 'text-ink/80',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-5 flex items-center gap-1">
            {SOCIALS.map(({ label, href, external, Icon }) => (
              <a
                key={label}
                href={href(meta)}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
