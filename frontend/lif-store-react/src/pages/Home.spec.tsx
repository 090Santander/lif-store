import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Home from './Home'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

describe('Página Home', () => {
  it('debe renderizar correctamente la vista principal del sitio', () => {
    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )
    expect(container).toBeTruthy()
  })
})