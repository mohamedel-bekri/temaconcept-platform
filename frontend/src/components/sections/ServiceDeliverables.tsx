import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const DELIVERABLES = [
  {
    title: 'Cadrage & architecture',
    sub: 'Document d\u2019architecture sign\u00e9 des deux parties avant tout d\u00e9veloppement.',
  },
  {
    title: 'Code source & propri\u00e9t\u00e9 intellectuelle',
    sub: 'D\u00e9p\u00f4t Git, cl\u00e9s et droits c\u00e9d\u00e9s en int\u00e9gralit\u00e9 \u00e0 la recette finale.',
  },
  {
    title: 'Documentation technique compl\u00e8te',
    sub: 'Guides d\u2019administration, proc\u00e9dures de d\u00e9ploiement et documentation API.',
  },
  {
    title: 'Formation & passation sur site',
    sub: 'Ateliers pratiques jusqu\u2019\u00e0 l\u2019autonomie compl\u00e8te de vos \u00e9quipes.',
  },
  {
    title: 'Supervision 24/7 & sauvegardes',
    sub: 'Monitoring continu, sauvegardes automatis\u00e9es et correctifs de s\u00e9curit\u00e9 sous 24\u202fh.',
  },
  {
    title: 'Ing\u00e9nieur d\u00e9di\u00e9 & SLA contractuel',
    sub: 'Un seul interlocuteur technique. Intervention garantie sous 2\u202fh en production.',
  },
]

export function ServiceDeliverables() {
  return (
    <Section bg="tinted">
      <div className="mx-auto max-w-5xl px-6 md:px-10">

        {/* ── Header ── */}
        <Reveal>
          <div className="grid gap-6 border-b border-verre-dark pb-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-acier">
                Engagements de livraison
              </p>
              <h2 className="display mt-3 text-3xl font-bold text-ink md:text-4xl leading-[1.15]">
                Ce que vous recevez,<br />sans exception.
              </h2>
            </div>

          </div>
        </Reveal>

        {/* ── Deliverables list ── */}
        <div className="mt-0 divide-y divide-verre-dark/60">
          {DELIVERABLES.map((item, i) => (
            <Reveal key={item.title} delay={i * 55}>
              <div className="group flex items-start justify-between gap-6 py-6 transition-colors duration-200 hover:bg-white/60 -mx-4 px-4 rounded">
                <div className="flex items-start gap-5">
                  <span className="font-mono text-xs text-acier/50 tabular-nums pt-0.5 shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-semibold text-ink leading-snug">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{item.sub}</p>
                  </div>
                </div>
                <span
                  className="shrink-0 text-ink/20 group-hover:text-ink/50 transition-colors duration-200 pt-0.5 text-lg leading-none"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── CTA ── */}
        <Reveal delay={340}>
          <div className="mt-10 flex justify-end border-t border-verre-dark pt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brume transition-all duration-200 hover:bg-transparent hover:text-ink"
            >
              Discuter du projet
            </Link>
          </div>
        </Reveal>

      </div>
    </Section>
  )
}
