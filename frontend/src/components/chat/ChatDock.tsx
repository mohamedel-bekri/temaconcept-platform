import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useChat } from '../../hooks/useChat'
import { cn } from '../../lib/cn'

const LinaAvatar = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 rounded-full bg-accent/10 p-1.5 text-accent-strong" aria-hidden="true">
    <circle cx="12" cy="8" r="3.2" fill="currentColor" />
    <path d="M5 20C5 16 8.5 13 12 13s7 3 7 7H5Z" fill="currentColor" opacity=".25" />
  </svg>
)

const TypingDots = () => <span className="ml-1 text-xs text-acier">Lina écrit<span className="animate-pulse">…</span></span>

interface ChatDockProps { open: boolean; onToggle: () => void; initialReplies?: string[] }

const DEFAULT_INITIAL_REPLIES = ['Découvrir les services', 'Demander un devis', 'Nos coordonnées']

export function ChatDock({ open, onToggle, initialReplies = DEFAULT_INITIAL_REPLIES }: ChatDockProps) {
  const { messages, quickReplies, sending, send, reset, retry } = useChat(initialReplies)
  const [input, setInput] = useState('')
  const [inputRows, setInputRows] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const atBottomRef = useRef(true)
  const disabled = sending || !input.trim()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => { atBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 64 }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { if (atBottomRef.current) bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, sending])
  useEffect(() => { if (open) { bottomRef.current?.scrollIntoView(); atBottomRef.current = true } }, [open])

  function sendText(text: string) {
    if (!text.trim() || sending) return
    atBottomRef.current = true
    setInput('')
    setInputRows(1)
    void send(text)
  }

  function onQuickReply(reply: string) {
    if (reply === 'Réessayer') {
      retry()
      return
    }
    sendText(reply)
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendText(input)
    }
  }

  const showQuick = !sending && quickReplies.length > 0

  return (
    <>
      <button type="button" onClick={onToggle} aria-label="Parler à Lina" className={cn('fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full border border-verre-dark bg-ink px-4 py-2.5 text-sm font-medium text-brume shadow-panel hover:bg-ink/90 focus-visible:outline-none', open && 'hidden')}>
        <LinaAvatar /> Parler à Lina
      </button>

      <div ref={containerRef} data-chat-open={open} className={cn('fixed bottom-6 right-6 z-50 flex h-[520px] max-h-[calc(100vh-3rem)] w-96 max-w-[calc(100vw-3rem)] flex-col rounded-xl border border-verre-dark bg-brume shadow-panel data-[chat-open=false]:hidden')}>
        <header className="flex shrink-0 items-center gap-3 border-b border-verre px-4 py-3">
          <LinaAvatar />
          <div className="flex flex-col"><span className="text-sm font-medium text-ink">Lina</span><span className="text-xs text-acier">Assistante TEMACONCEPT</span></div>
          <button type="button" onClick={reset} className="ml-auto text-xs text-acier hover:text-ink focus-visible:underline">Nouveau</button>
          <button type="button" onClick={onToggle} aria-label="Fermer" className="rounded-md p-1 text-acier hover:text-ink focus-visible:outline-none"><span aria-hidden="true" className="text-lg font-bold">&times;</span></button>
        </header>

        <ul role="log" aria-live="polite" aria-relevant="additions" className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
          {messages.map((message) => {
            const isBot = message.role === 'assistant'
            return <li key={message.id} className={cn('max-w-[85%] whitespace-pre-line break-words', isBot ? 'self-start rounded-2xl rounded-tl-sm bg-verre px-3.5 py-2.5 text-ink' : 'ml-auto self-end rounded-2xl rounded-br-sm bg-ink px-3.5 py-2.5 text-brume')}>
              {message.content}<span className="mt-1 block text-[10px] opacity-40">{message.at}</span>
            </li>
          })}
          {sending && <li className="self-start"><span className="inline-flex items-center text-xs text-acier"><LinaAvatar /><TypingDots /></span></li>}
          <div ref={bottomRef} />
        </ul>

        {showQuick && <div className="shrink-0 border-t border-verre/60 px-4 py-2"><ul className="flex flex-wrap gap-2 text-xs">
          {quickReplies.slice(0, 3).map((reply) => <li key={reply}><button type="button" onClick={() => onQuickReply(reply)} className="rounded-md border border-verre bg-white px-3 py-1.5 text-ink hover:bg-ink hover:text-brume focus-visible:outline-none">{reply}</button></li>)}
        </ul></div>}

        <form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); sendText(input) }} className="shrink-0 border-t border-verre bg-white p-3">
          <div className="flex items-end gap-2"><label htmlFor="chat-input" className="sr-only">Votre message</label>
            <textarea id="chat-input" value={input} onChange={(event) => { setInput(event.target.value); setInputRows(event.target.value.trim() === '' ? 1 : Math.min(4, event.target.value.split('\n').length)) }} onKeyDown={onKeyDown} rows={inputRows} maxLength={1000} placeholder="Écrivez votre message…" aria-label="Votre message" className="input min-h-[42px] flex-1 resize-none px-3 py-2.5 text-sm" />
            <button type="submit" disabled={disabled} aria-label="Envoyer" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-brume transition-colors hover:bg-ink-soft disabled:bg-verre-dark disabled:text-ink/30 focus-visible:outline-none">→</button>
          </div>
          <p className="mt-2 text-[10px] leading-tight text-acier">N’envoyez pas d’informations sensibles. Vos coordonnées ne sont transmises à l’équipe qu’avec votre accord.</p>
        </form>
      </div>
    </>
  )
}

export default ChatDock
