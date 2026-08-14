import type {
  AuthUser,
  ChatResponse,
  Lead,
  LeadDetail,
  Paginated,
  SiteData,
} from '../types'

const TOKEN_KEY = 'tema_token'
const USER_KEY = 'tema_user'
const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function setSession(token: string, user: AuthUser): void {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type QueryParams = Record<string, string | number | undefined>

function toQuery(params?: QueryParams): string {
  if (!params) return ''
  const qs = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') qs.set(key, String(value))
  }
  const str = qs.toString()
  return str ? `?${str}` : ''
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (options.body) headers['Content-Type'] = 'application/json'

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })

  if (!response.ok) {
    let detail = response.statusText
    try {
      const body = (await response.json()) as {
        message?: string
        errors?: Record<string, string[]>
      }
      const first = body.errors
        ? Object.values(body.errors)[0]?.[0]
        : undefined
      detail = body.message ?? first ?? response.statusText
    } catch {
      // corps non-JSON : on garde le statut
    }
    throw new ApiError(detail, response.status)
  }

  return (await response.json()) as T
}

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

export const api = {
  site: () => request<SiteData>('/api/site'),

  chat: (message: string, sessionUuid?: string | null) =>
    request<ChatResponse>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        ...(sessionUuid ? { session_uuid: sessionUuid } : {}),
      }),
    }),

  contact: (payload: ContactPayload) =>
    request<{ message: string }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (email: string, password: string) =>
    request<{ token: string; user: AuthUser }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () => request<{ message: string }>('/api/auth/logout', { method: 'POST' }),

  me: () => request<{ user: AuthUser }>('/api/auth/me'),

  leads: (params?: { status?: string; q?: string; page?: number }) =>
    request<Paginated<Lead>>(`/api/leads${toQuery(params)}`),

  lead: (id: number) =>
    request<{ data: LeadDetail }>(`/api/leads/${id}`),

  updateLeadStatus: (id: number, status: string) =>
    request<{ data: Lead }>(`/api/leads/${id}/status`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    }),
}
