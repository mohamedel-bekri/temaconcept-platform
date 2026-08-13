import { createContext, useContext } from 'react'

export interface ChatDockContextValue {
  openChat: () => void
}

/** Fourni par <SiteLayout> : permet à n'importe quelle page d'ouvrir Lina. */
export const ChatDockContext = createContext<ChatDockContextValue | null>(null)

export function useChatDock(): ChatDockContextValue {
  const ctx = useContext(ChatDockContext)
  if (!ctx) throw new Error('useChatDock doit être utilisé dans <SiteLayout>')
  return ctx
}
