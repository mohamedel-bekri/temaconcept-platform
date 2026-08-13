import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { api } from '../api/client'
import type { SiteData } from '../types'

interface SiteContextValue {
  site: SiteData | null
  error: string | null
  loading: boolean
  reload: () => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

/**
 * Charge une seule fois le contenu du site (`/api/site`) et le partage
 * à toutes les pages publiques : meta, services, projets, visuels.
 */
export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    api
      .site()
      .then((data) => {
        if (!cancelled) setSite(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Impossible de charger le contenu.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => load(), [load])

  const value = useMemo(
    () => ({ site, error, loading, reload: load }),
    [site, error, loading, load],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite doit être utilisé dans <SiteProvider>')
  return ctx
}
