import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Solicitudes from './Solicitudes'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

describe('Página Solicitudes', () => {
  it('debe renderizar la gestión de solicitudes', () => {
    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Solicitudes />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )
    expect(container).toBeTruthy()
  })
})