import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from '../SignIn'
import { AuthProvider } from '../../hooks/useAuth'
import { api } from '../../api/client'

vi.mock('../../api/client', () => ({
  api: { login: vi.fn(), logout: vi.fn() },
  getToken: () => localStorage.getItem('tema_token'),
  setSession: (token: string, user: unknown) => {
    localStorage.setItem('tema_token', token)
    localStorage.setItem('tema_user', JSON.stringify(user))
  },
  clearSession: () => {
    localStorage.removeItem('tema_token')
    localStorage.removeItem('tema_user')
  },
  getStoredUser: () => {
    const raw = localStorage.getItem('tema_user')
    return raw ? JSON.parse(raw) : null
  },
}))

function renderSignIn() {
  return render(
    <MemoryRouter initialEntries={['/connexion']}>
      <AuthProvider>
        <Routes>
          <Route path="/connexion" element={<SignIn />} />
          <Route path="/espace" element={<div>ESPACE OK</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('SignIn', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.mocked(api.login).mockReset()
  })

  it('submits credentials and navigates to the space', async () => {
    vi.mocked(api.login).mockResolvedValue({
      token: 'token-123',
      user: {
        id: 1,
        name: 'Admin TEMA',
        email: 'admin@temaconcept.com',
        role: 'admin',
      },
    })

    const user = userEvent.setup()
    renderSignIn()

    await user.type(screen.getByLabelText('Email'), 'admin@temaconcept.com')
    await user.type(screen.getByLabelText('Mot de passe'), 'password')
    await user.click(screen.getByRole('button', { name: 'Se connecter' }))

    expect(api.login).toHaveBeenCalledWith('admin@temaconcept.com', 'password')
    expect(await screen.findByText('ESPACE OK')).toBeInTheDocument()
  })

  it('shows an error message on invalid credentials', async () => {
    vi.mocked(api.login).mockRejectedValue(new Error('Identifiants incorrects.'))

    const user = userEvent.setup()
    renderSignIn()

    await user.type(screen.getByLabelText('Email'), 'nope@test.ma')
    await user.type(screen.getByLabelText('Mot de passe'), 'wrong')
    await user.click(screen.getByRole('button', { name: 'Se connecter' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Identifiants incorrects.',
    )
    expect(screen.queryByText('ESPACE OK')).not.toBeInTheDocument()
  })

  it('displays the demo accounts hint', () => {
    renderSignIn()
    expect(screen.getByText('admin@temaconcept.com — mot de passe : password')).toBeInTheDocument()
  })
})
