import { render, screen } from '@testing-library/react'
import EntradaCard from './EntradaCard'
import { CarritoProvider } from '../context/CarritoContext'

describe('EntradaCard Component', () => {
  it('debe renderizar la entrada correctamente', () => {
    const entrada = {
      id: 'e1',
      partido: 'Final Torneo',
      fecha: '2026-11-01',
      lugar: 'Estadio Principal',
      precio: 5000,
      stock: 100
    }

    render(
      <CarritoProvider>
        <EntradaCard entrada={entrada} />
      </CarritoProvider>
    )
    expect(screen.getByText(/Final Torneo/i)).toBeTruthy()
  })
})