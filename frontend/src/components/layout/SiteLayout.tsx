import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteProvider, useSite } from '../../hooks/useSite'
import { ChatDockContext } from '../../hooks/useChatDock'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { ChatDock } from '../chat/ChatDock'
import { Rosette } from '../signature/Rosette'
import { Logo } from './Logo'
import { Button } from '../ui/Button'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function SiteFrame() {
  const { site, loading, error, reload } = useSite()
  const [chatOpen, setChatOpen] = useState(false)

  const chatValue = useMemo(() => ({ openChat: () => setChatOpen(true) }), [])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink">
        <span className="h-16 w-16 text-brume/80">
          <Rosette />
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-brume/70">
          Chargement du système…
        </p>
      </div>
    )
  }

  if (error || !site) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center text-brume">
        <Logo variant="dark" markSize={56} />
        <p className="font-display text-2xl font-extrabold">
          Impossible de charger le contenu du site.
        </p>
        <p className="max-w-md font-mono text-xs leading-relaxed text-brume/70">{error}</p>
        <Button tone="dark" variant="secondary" onClick={reload}>
          Réessayer
        </Button>
      </div>
    )
  }

  return (
    <ChatDockContext.Provider value={chatValue}>
      <ScrollToTop />
      <div className="min-h-screen bg-brume">
        <Nav meta={site.meta} />
        <main>
          <Outlet />
        </main>
        <Footer meta={site.meta} />
        <ChatDock open={chatOpen} onToggle={() => setChatOpen((value) => !value)} />
      </div>
    </ChatDockContext.Provider>
  )
}

export function SiteLayout() {
  return (
    <SiteProvider>
      <SiteFrame />
    </SiteProvider>
  )
}
