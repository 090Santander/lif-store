import { render, screen } from '@testing-library/react'
import SedeCard from './SedeCard'

describe('SedeCard Component', () => {
  it('debe renderizar la información de la sede', () => {
    const sede = {
      id: 's1',
      nombre: 'Complejo Deportivo Norte',
      direccion: 'Av. Siempreviva 123',
      canchas: 4,
      imagen: 'sede.jpg'
    }

    render(<SedeCard sede={sede} />)
    expect(screen.getByText('Complejo Deportivo Norte')).toBeTruthy()
  })
})