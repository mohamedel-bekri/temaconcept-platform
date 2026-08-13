export interface Service {
  code: string
  slug: string | null
  name: string
  tagline: string
  description: string
  bullets: string[] | null
  icon: string
  order: number
}

export interface Project {
  id: number
  title: string
  client: string | null
  sector: string | null
  summary: string
  tags: string[] | null
  image_url: string | null
  year: string | null
}

export interface Visual {
  key: string
  slot: string
  url: string
  credit: string | null
  alt: string
  source: string
}

export interface SiteMeta {
  name: string
  tagline: string
  address: string
  phone: string
  email_contact: string
  email_support: string
  hours: string
  years: number
  projects: number
}

export interface SiteData {
  meta: SiteMeta
  services: Service[]
  projects: Project[]
  visuals: Record<string, Visual[]>
}

export interface ChatLeadState {
  score: number
  status: string
}

export interface ChatResponse {
  session_uuid: string
  reply: string
  quick_replies: string[]
  intent: string
  escalated: boolean
  lead: ChatLeadState
}

export type Role = 'admin' | 'client'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: Role
}

export interface Lead {
  id: number
  session_uuid: string | null
  name: string | null
  company: string | null
  email: string | null
  phone: string | null
  need: string | null
  budget: string | null
  timeline: string | null
  role: string | null
  score: number
  status: string
  source: string
  escalated: boolean
  notes: string | null
  created_at: string
  updated_at: string
  chat_sessions_count?: number
}

export interface ChatMessageLite {
  id: number
  role: 'user' | 'assistant'
  content: string
  meta: { intent?: string } | null
  created_at: string
}

export interface ChatSessionLite {
  id: number
  session_uuid: string
  status: string
  message_count: number
  messages: ChatMessageLite[]
}

export interface LeadDetail extends Lead {
  chat_sessions: ChatSessionLite[]
}

export interface Paginated<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
