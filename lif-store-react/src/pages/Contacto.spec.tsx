import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Contacto from './Contacto'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

describe('Página Contacto', () => {
  it('debe renderizar la vista de contacto', () => {
    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Contacto />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )
    expect(container).toBeTruthy()
  })
})