import { useSite } from '../hooks/useSite'
import { useChatDock } from '../hooks/useChatDock'
import { Hero } from './home/Hero'
import { NotreObjectif } from './home/NotreObjectif'
import { ServicesGrid } from './home/ServicesGrid'
import { Performance } from './home/Performance'
import { CTABand } from '../components/ui/CTABand'

export function Home() {
  const { site } = useSite()
  const { openChat } = useChatDock()

  if (!site) return null

  return (
    <main>
      <Hero onChat={openChat} />
      <NotreObjectif meta={site.meta} />
      <ServicesGrid services={site.services} />
      <Performance meta={site.meta} />
      <CTABand />
    </main>
  )
}
