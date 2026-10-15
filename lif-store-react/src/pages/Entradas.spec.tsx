import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Entradas from './Entradas'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

describe('Página Entradas', () => {
  it('debe renderizar la sección de venta de entradas', () => {
    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Entradas />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )
    expect(container).toBeTruthy()
  })
})