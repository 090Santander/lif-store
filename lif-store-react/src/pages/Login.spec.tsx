import { render, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Login from './Login'
import { AuthProvider } from '../context/AuthContext'

describe('Página Login (Login.spec.tsx)', () => {
  beforeEach(() => {
    localStorage.clear()
    spyOn(window, 'alert').and.stub()
  })

  afterEach(() => {
    cleanup()
  })

  const renderLogin = () =>
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    )

  it('debe mostrar alerta cuando las credenciales son inválidas', () => {
    const { container } = renderLogin()

    const inputEmail = container.querySelector('#inputEmail') as HTMLInputElement
    const inputPassword = container.querySelector('#inputPassword') as HTMLInputElement
    const form = container.querySelector('form')

    if (inputEmail && inputPassword) {
      fireEvent.change(inputEmail, { target: { value: 'a' } })
      fireEvent.change(inputPassword, { target: { value: '1' } })
    }

    if (form) {
      fireEvent.submit(form)
    }

    expect(window.alert).toHaveBeenCalledWith('Por favor, ingresa credenciales válidas.')
  })

  it('debe iniciar sesión exitosamente como Administrador', () => {
    const { container } = renderLogin()

    const inputEmail = container.querySelector('#inputEmail') as HTMLInputElement
    const inputPassword = container.querySelector('#inputPassword') as HTMLInputElement
    const form = container.querySelector('form')

    if (inputEmail && inputPassword) {
      fireEvent.change(inputEmail, { target: { value: 'admin@lifchile.cl' } })
      fireEvent.change(inputPassword, { target: { value: 'admin123' } })
    }

    if (form) {
      fireEvent.submit(form)
    }

    expect(window.alert).toHaveBeenCalledWith('🛡️ ¡Bienvenido, Administrador!')
  })

  it('debe iniciar sesión exitosamente como usuario estándar', () => {
    const { container } = renderLogin()

    const inputEmail = container.querySelector('#inputEmail') as HTMLInputElement
    const inputPassword = container.querySelector('#inputPassword') as HTMLInputElement
    const form = container.querySelector('form')

    if (inputEmail && inputPassword) {
      fireEvent.change(inputEmail, { target: { value: 'usuario@correo.com' } })
      fireEvent.change(inputPassword, { target: { value: '123456' } })
    }

    if (form) {
      fireEvent.submit(form)
    }

    expect(window.alert).toHaveBeenCalledWith('👋 ¡Bienvenido de nuevo!')
  })
})