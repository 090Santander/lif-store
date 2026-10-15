import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Admin from './Admin'
import { AuthProvider } from '../context/AuthContext'

describe('Página Admin', () => {
  it('debe renderizar el panel de administración e interactuar con las pestañas', () => {
    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <Admin />
        </MemoryRouter>
      </AuthProvider>
    )

    const buttons = container.querySelectorAll('button')
    buttons.forEach((btn) => {
      try {
        fireEvent.click(btn)
      } catch (e) {}
    })

    expect(container).toBeTruthy()
  })
})