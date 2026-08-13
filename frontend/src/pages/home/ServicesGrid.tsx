import type { Service } from '../../types'
import { Reveal } from '../../components/ui/Reveal'
import { Section } from '../../components/ui/Section'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { Button } from '../../components/ui/Button'

const SERVICE_IMAGES: Record<string, string> = {
  '01': '/images/about-atelier.jpg',
  '02': '/images/project-mobile.jpg',
  '03': '/images/project-server.jpg',
  '04': '/images/labo-security.jpg',
  '05': '/images/labo-whiteboard.jpg',
  '06': '/images/project-logistics.jpg',
}

export function ServicesGrid({ services }: { services: Service[] }) {
  // Show concise preview of 3 services on Home to keep content unique and non-redundant
  const previewServices = services.slice(0, 3)

  return (
    <Section id="services" bg="white">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          align="center"
          kicker="NOS EXPERTISES"
          title={
            <>
              Des solutions concrètes pour
              <br />
              vos systèmes d'information.
            </>
          }
          lede="Une sélection de nos domaines d'intervention prioritaires pour vos projets informatiques."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewServices.map((service, index) => (
            <Reveal key={service.code} delay={(index % 3) * 110}>
              <ServiceCard service={service} image={SERVICE_IMAGES[service.code]} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button to="/services" variant="secondary">
            <span className="group inline-flex items-center gap-2">
              Découvrir nos 6 expertises
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}
