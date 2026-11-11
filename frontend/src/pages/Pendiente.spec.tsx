import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Pendiente from './Pendiente'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

describe('Página Pendiente', () => {
  it('debe renderizar la vista de estado pendiente', () => {
    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Pendiente titulo="Estado Pendiente" />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )
    expect(container).toBeTruthy()
  })
})