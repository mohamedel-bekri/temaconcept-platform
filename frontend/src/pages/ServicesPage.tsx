import { useSite } from '../hooks/useSite'
import { useChatDock } from '../hooks/useChatDock'
import { PageHero } from '../components/layout/PageHero'
import { ServicesShowcase } from '../components/sections/ServicesShowcase'
import { ServiceDeliverables } from '../components/sections/ServiceDeliverables'
import { CTABand } from '../components/ui/CTABand'

export function ServicesPage() {
  const { site } = useSite()
  const { openChat } = useChatDock()

  if (!site) return null

  return (
    <>
      <PageHero
        kicker="SERVICES"
        title={
          <>
            Six disciplines,
            <br />
            une seule promesse.
          </>
        }
        lede="Des offres d'ingénierie informatique complémentaires et sur-mesure pour accompagner la transformation de votre entreprise."
      />
      <ServicesShowcase services={site.services} onChat={openChat} />
      <ServiceDeliverables />
      <CTABand />
    </>
  )
}
