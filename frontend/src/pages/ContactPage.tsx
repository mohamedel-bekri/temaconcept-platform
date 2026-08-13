import { useSite } from '../hooks/useSite'
import { useChatDock } from '../hooks/useChatDock'
import { PageHero } from '../components/layout/PageHero'
import { ContactForm } from '../components/sections/ContactForm'
import { Button } from '../components/ui/Button'

export function ContactPage() {
  const { site } = useSite()
  const { openChat } = useChatDock()

  if (!site) return null

  return (
    <>
      <PageHero
        kicker="CONTACT"
        title={
          <>
            Parlons de votre projet,
            <br />
            pas de notre plaquette.
          </>
        }
        lede="Décrivez votre besoin en quelques lignes : réponse sous 48h. Besoin d'une réponse immédiate ? Lina est là."
      >
        <Button variant="ghost" tone="dark" onClick={openChat}>
          Discuter avec Lina
        </Button>
      </PageHero>

      <ContactForm meta={site.meta} />
    </>
  )
}
