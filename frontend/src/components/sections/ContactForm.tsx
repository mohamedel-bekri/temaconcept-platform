import { useState, type FormEvent, type ReactElement } from 'react'
import type { SiteMeta } from '../../types'
import { api } from '../../api/client'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Button } from '../ui/Button'

type FormState = 'idle' | 'sending' | 'done' | 'error'

type FormKey = 'name' | 'email' | 'phone' | 'company' | 'message'

const INITIAL_FORM: Record<FormKey, string> = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
}

const FORM_FIELDS: Array<{
  key: FormKey
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'tel'
  required?: boolean
}> = [
  { key: 'name', label: 'Nom complet *', placeholder: 'Votre nom complet', type: 'text', required: true },
  { key: 'email', label: 'Email *', placeholder: 'vous@entreprise.ma', type: 'email', required: true },
  { key: 'phone', label: 'Téléphone', placeholder: '+212 6 00 00 00 00', type: 'tel' },
  { key: 'company', label: 'Société', placeholder: 'Votre société', type: 'text' },
]

interface ContactFormProps {
  meta: SiteMeta
}

export function ContactForm({ meta }: ContactFormProps) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  const setField = (key: FormKey) => (value: string) =>
    setForm((previous) => ({ ...previous, [key]: value }))

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'sending') return

    setState('sending')
    setError('')
    try {
      await api.contact({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        message: form.message,
      })
      setState('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setState('error')
    }
  }

  const inputProps = (key: FormKey) => ({
    id: key,
    value: form[key],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setField(key)(event.target.value),
  })

  const renderForm = (): ReactElement => {
    if (state === 'done') {
      return (
        <div
          aria-live="polite"
          className="flex min-h-[24rem] flex-col items-center justify-center gap-4 text-center"
        >
          <span className="font-mono text-4xl text-success">✓</span>
          <h3 className="display text-2xl text-ink">Message envoyé.</h3>
          <p className="max-w-sm text-sm leading-relaxed text-ink/70">
            Merci {form.name.split(' ')[0] || 'à vous'} ! Nous revenons vers
            vous sous 48h. En attendant, Lina peut répondre à vos questions
            immédiatement.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setForm(INITIAL_FORM)
              setState('idle')
            }}
          >
            Envoyer un autre message
          </Button>
        </div>
      )
    }

    return (
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          {FORM_FIELDS.map((field) => (
            <div className="field" key={field.key}>
              <label className="field-label" htmlFor={field.key}>
                {field.label}
              </label>
              <input
                required={field.required}
                type={field.type ?? 'text'}
                className="input"
                placeholder={field.placeholder}
                {...inputProps(field.key)}
              />
            </div>
          ))}
        </div>
        <div className="field">
          <label className="field-label" htmlFor="message">
            Votre besoin *
          </label>
          <textarea
            required
            rows={5}
            className="input resize-y"
            placeholder="Décrivez votre projet, vos délais, votre contexte…"
            {...inputProps('message')}
          />
        </div>

        {state === 'error' ? (
          <p
            className="border border-danger/30 bg-danger/10 px-4 py-3 font-mono text-xs text-danger"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          className="w-full md:w-auto"
          disabled={state === 'sending'}
        >
          {state === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
        </Button>
      </form>
    )
  }

  return (
    <Section id="contact">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          kicker="Contact"
          title={
            <>
              Un projet ?
              <br />
              Parlons système.
            </>
          }
          lede="Décrivez votre besoin : nous revenons vers vous sous 48h avec des premières questions, pas un discours."
        />

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="kicker">Adresse</p>
                <p className="mt-2 leading-relaxed text-ink/80">{meta.address}</p>
              </div>
              <div>
                <p className="kicker">Téléphone</p>
                <p className="mt-2">
                  <a
                    href={`tel:${meta.phone.replace(/\s/g, '')}`}
                    className="font-display text-2xl font-extrabold text-ink hover:text-acier"
                  >
                    {meta.phone}
                  </a>
                </p>
              </div>
              <div>
                <p className="kicker">Email</p>
                <p className="mt-2">
                  <a
                    href={`mailto:${meta.email_contact}`}
                    className="font-display text-2xl font-extrabold text-ink hover:text-acier"
                  >
                    {meta.email_contact}
                  </a>
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Support :{' '}
                  <a href={`mailto:${meta.email_support}`} className="hover:text-ink">
                    {meta.email_support}
                  </a>
                </p>
              </div>
              <div>
                <p className="kicker">Horaires</p>
                <p className="mt-2 text-ink/80">{meta.hours}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel p-6 md:p-8">{renderForm()}</div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
