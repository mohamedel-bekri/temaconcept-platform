import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { RevealDraw } from '../ui/RevealDraw'

export function Method() {
  return (
    <Section id="methode" bg="verre">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* ---------- Heading — left-aligned, no kicker symmetry ---------- */}
        <Reveal>
          <p className="kicker">Comment on travaille</p>
          <h2 className="display mt-4 max-w-2xl text-3xl text-ink md:text-5xl">
            On ne code pas avant
            <br />
            d'avoir compris votre métier.
          </h2>
        </Reveal>

        {/* ---------- Editorial two-column — asymmetric ---------- */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:items-start">
          {/* Left — narrative text + callout */}
          <Reveal>
            <div>
              <p className="text-lg leading-relaxed text-ink/85">
                Chaque projet commence par des ateliers de cadrage : on passe du
                temps à écouter, à cartographier vos processus, à identifier ce
                qui bloque. Ensuite seulement, on rédige un cahier des charges
                que vous validez — avant qu'une seule ligne de code ne soit
                écrite.
              </p>
              <p className="mt-5 leading-relaxed text-ink/70">
                Une fois le développement lancé, vous participez à des recettes
                intermédiaires. La mise en production est planifiée pour ne pas
                interrompre votre activité : migration des données, formation
                des équipes, bascule progressive.
              </p>

              {/* Callout — asymmetric accent block */}
              <div className="mt-10 flex items-start gap-5 border-l-2 border-azure pl-6">
                <div>
                  <p className="font-display text-4xl font-black tracking-tight text-ink">
                    48h
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    Délai habituel pour recevoir une première proposition après
                    un échange sur votre besoin. Pas un devis figé — des
                    premières questions et un périmètre réaliste.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — compact key-points, definition-list style */}
          <Reveal delay={140}>
            <div className="panel p-7 md:p-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-acier">
                Ce que ça donne concrètement
              </p>
              <RevealDraw className="mt-4 h-px bg-verre-dark" />

              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="font-display text-base font-extrabold text-ink">
                    Cadrage validé avant le code
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink/70">
                    Cahier des charges, architecture, maquettes — tout est posé
                    et approuvé par vous.
                  </dd>
                </div>

                <div>
                  <dt className="font-display text-base font-extrabold text-ink">
                    Recettes en continu
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink/70">
                    Vous testez au fur et à mesure. Pas de mauvaise surprise à
                    la livraison.
                  </dd>
                </div>

                <div>
                  <dt className="font-display text-base font-extrabold text-ink">
                    Mise en production accompagnée
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink/70">
                    Migration, formation, bascule progressive — sans arrêter
                    votre activité.
                  </dd>
                </div>

                <div>
                  <dt className="font-display text-base font-extrabold text-ink">
                    Maintenance après livraison
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink/70">
                    On reste. Supervision, correctifs, évolutions — un système
                    se juge à l'usage.
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
