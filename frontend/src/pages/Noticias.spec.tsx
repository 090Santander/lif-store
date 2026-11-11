import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Noticias from './Noticias'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

describe('Página Noticias', () => {
  it('debe renderizar el panel de noticias de la liga', () => {
    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Noticias />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )
    expect(container).toBeTruthy()
  })
})