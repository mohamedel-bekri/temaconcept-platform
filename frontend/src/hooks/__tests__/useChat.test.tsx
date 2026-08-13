import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useChat } from '../useChat'
import { api } from '../../api/client'
import type { ChatResponse } from '../../types'

vi.mock('../../api/client', () => ({
  api: { chat: vi.fn() },
}))

const response = (overrides: Partial<ChatResponse> = {}): ChatResponse => ({
  session_uuid: 'session-1',
  reply: 'Voici nos services…',
  quick_replies: ['Devis', 'Coordonnées'],
  intent: 'services',
  escalated: false,
  lead: { score: 0, status: 'new' },
  ...overrides,
})

describe('useChat', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.mocked(api.chat).mockReset()
  })

  it('starts with a greeting and the initial quick replies', () => {
    const { result } = renderHook(() => useChat(['A', 'B', 'C']))
    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0].role).toBe('assistant')
    expect(result.current.quickReplies).toEqual(['A', 'B', 'C'])
    expect(result.current.sending).toBe(false)
  })

  it('sends a message and appends the assistant reply', async () => {
    vi.mocked(api.chat).mockResolvedValue(response())

    const { result } = renderHook(() => useChat([]))

    await act(async () => {
      await result.current.send('  Quels sont vos services ?  ')
    })

    expect(api.chat).toHaveBeenCalledWith('Quels sont vos services ?', null)
    expect(result.current.messages).toHaveLength(3)
    expect(result.current.messages[1].role).toBe('user')
    expect(result.current.messages[1].content).toBe('Quels sont vos services ?')
    expect(result.current.messages[2].role).toBe('assistant')
    expect(result.current.messages[2].content).toBe('Voici nos services…')
    expect(result.current.quickReplies).toEqual(['Devis', 'Coordonnées'])
    expect(localStorage.getItem('tema_chat_session')).toBe('session-1')
  })

  it('reuses the session uuid for the next message', async () => {
    vi.mocked(api.chat).mockResolvedValue(response())
    const { result } = renderHook(() => useChat([]))

    await act(async () => {
      await result.current.send('Bonjour')
    })
    expect(api.chat).toHaveBeenLastCalledWith('Bonjour', null)

    vi.mocked(api.chat).mockResolvedValue(response({ session_uuid: 'session-2' }))
    await act(async () => {
      await result.current.send('Un devis ?')
    })
    expect(api.chat).toHaveBeenLastCalledWith('Un devis ?', 'session-1')
  })

  it('surfaces escalation and lead state', async () => {
    vi.mocked(api.chat).mockResolvedValue(
      response({
        escalated: true,
        lead: { score: 72, status: 'qualified' },
      }),
    )
    const { result } = renderHook(() => useChat([]))

    await act(async () => {
      await result.current.send('Je veux être rappelé')
    })

    expect(result.current.escalated).toBe(true)
    expect(result.current.lead?.score).toBe(72)
    expect(result.current.lead?.status).toBe('qualified')
  })

  it('appends a fallback message when the API fails', async () => {
    vi.mocked(api.chat).mockRejectedValue(new Error('réseau coupé'))
    const { result } = renderHook(() => useChat([]))

    await act(async () => {
      await result.current.send('Bonjour')
    })

    expect(result.current.messages).toHaveLength(3)
    expect(result.current.messages[2].content).toContain('Réessayez')
    expect(result.current.sending).toBe(false)
  })
})
