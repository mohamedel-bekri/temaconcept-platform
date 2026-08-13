import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { Button } from './Button'
import { Section } from './Section'
import { useChatDock } from '../../hooks/useChatDock'

interface CTABandProps {
  id?: string
  title?: ReactNode
  lede?: string
}

/**
 * Bandeau d'appel à l'action sombre utilisé en fin de page :
 * pousse vers le formulaire de contact et vers Lina.
 */
export function CTABand({
  id,
  title = (
    <>
      Un projet ?
      <br />
      Parlons système.
    </>
  ),
  lede = 'Décrivez votre besoin : nous revenons vers vous sous 48h avec des premières questions, pas un discours.',
}: CTABandProps) {
  const { openChat } = useChatDock()

  return (
    <Section id={id} bg="ink" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_80%_20%,rgb(143_162_181/0.18),transparent_60%)]"
      />
      <Reveal className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="kicker text-brume/80">CONTACT</p>
            <h2 className="display mt-5 text-3xl text-brume md:text-5xl">{title}</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-brume/85">{lede}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button to="/contact" tone="dark" variant="secondary">
              Nous contacter
            </Button>
            <Button tone="dark" variant="ghost" onClick={openChat}>
              Parler à Lina
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
