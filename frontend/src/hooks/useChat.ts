import { useCallback, useRef, useState } from 'react'
import { api } from '../api/client'
import type { ChatResponse } from '../types'

const SESSION_KEY = 'tema_chat_session'

const readSession = (): string | null => {
  try {
    return localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

export interface ChatTurn {
  id: number
  role: 'user' | 'assistant'
  content: string
  at: string
}

const GREETING =
  'Bonjour, je suis Lina. Je peux répondre à vos questions sur nos services, les devis ou notre accompagnement. Que recherchez-vous ?'

const FALLBACK_SUGGESTIONS = ['Poser une autre question', 'Nous contacter']
const RETRY_SUGGESTIONS = ['Réessayer', 'Nous contacter']

const now = () =>
  new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

interface ChatOptions {
  /** Désactive l'attente visuelle pour les tests. */
  typingMs?: number
}

/** Etat conversationnel de Lina. L'indicateur de frappe est affiché pendant
 * la requête réseau : aucune attente artificielle n'est ajoutée après réponse. */
export function useChat(initialReplies: string[], options: ChatOptions = {}) {
  const [messages, setMessages] = useState<ChatTurn[]>([
    { id: 0, role: 'assistant', content: GREETING, at: now() },
  ])
  const [quickReplies, setQuickReplies] = useState<string[]>(initialReplies)
  const [sending, setSending] = useState(false)
  const [escalated, setEscalated] = useState(false)
  const [lead, setLead] = useState<ChatResponse['lead'] | null>(null)
  const sessionRef = useRef<string | null>(readSession())
  const nextId = useRef(1)
  const lastMessageRef = useRef<string | null>(null)

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      // stockage indisponible : l'état en mémoire est tout de même réinitialisé
    }
    sessionRef.current = null
    nextId.current = 1
    setMessages([{ id: 0, role: 'assistant', content: GREETING, at: now() }])
    setQuickReplies(initialReplies)
    setEscalated(false)
    setLead(null)
  }, [initialReplies])

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || sending) return
      lastMessageRef.current = trimmed

      setMessages((previous) => [
        ...previous,
        { id: nextId.current++, role: 'user', content: trimmed, at: now() },
      ])
      setQuickReplies([])
      setSending(true)

      try {
        const response = await api.chat(trimmed, sessionRef.current)
        sessionRef.current = response.session_uuid
        try {
          localStorage.setItem(SESSION_KEY, response.session_uuid)
        } catch {
          // le chat reste utilisable sans persistance
        }
        if (options.typingMs && options.typingMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, options.typingMs))
        }
        setMessages((previous) => [
          ...previous,
          { id: nextId.current++, role: 'assistant', content: response.reply, at: now() },
        ])
        setQuickReplies(response.quick_replies.length > 0 ? response.quick_replies : FALLBACK_SUGGESTIONS)
        setEscalated(response.escalated)
        setLead(response.lead)
      } catch {
        setMessages((previous) => [
          ...previous,
          {
            id: nextId.current++,
            role: 'assistant',
            content: 'Je ne peux pas répondre pour le moment. Réessayez dans un instant ou écrivez-nous à contact@temaconcept.com.',
            at: now(),
          },
        ])
        setQuickReplies(RETRY_SUGGESTIONS)
      } finally {
        setSending(false)
      }
    },
    [options.typingMs, sending],
  )

  const retry = useCallback(() => {
    if (lastMessageRef.current) void send(lastMessageRef.current)
  }, [send])

  return { messages, quickReplies, sending, escalated, lead, send, reset, retry }
}
