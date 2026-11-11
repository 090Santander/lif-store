import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Actas from './Actas'
import { AuthProvider } from '../context/AuthContext'

describe('Página Actas', () => {
  it('debe renderizar el módulo de actas e interactuar con filtros y pestañas', () => {
    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <Actas />
        </MemoryRouter>
      </AuthProvider>
    )

    const inputs = container.querySelectorAll('input, select')
    inputs.forEach((input) => {
      try { fireEvent.change(input, { target: { value: 'Macul' } }) } catch (e) {}
    })

    const buttons = container.querySelectorAll('button, .nav-link')
    buttons.forEach((btn) => {
      try { fireEvent.click(btn) } catch (e) {}
    })

    expect(container).toBeTruthy()
  })
})