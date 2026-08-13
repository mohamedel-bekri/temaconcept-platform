import type { ReactElement, SVGProps } from 'react'
import type { SiteMeta } from '../types'
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
} from '../components/ui/ContactIcons'

export const SITE_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/services', label: 'Services' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/contact', label: 'Contact' },
]

export interface SocialLink {
  label: string
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement
  external: boolean
  href: (meta: SiteMeta) => string
}

export const SOCIALS: SocialLink[] = [
  {
    label: 'WhatsApp',
    Icon: WhatsAppIcon,
    external: true,
    href: (meta) => `https://wa.me/${meta.phone.replace(/\s/g, '')}`,
  },
  {
    label: 'Téléphone',
    Icon: PhoneIcon,
    external: false,
    href: (meta) => `tel:${meta.phone.replace(/\s/g, '')}`,
  },
  {
    label: 'Email',
    Icon: MailIcon,
    external: false,
    href: (meta) => `mailto:${meta.email_contact}`,
  },
]
