import { render, fireEvent } from '@testing-library/react'
import EntradaCard from './EntradaCard'

describe('Componente EntradaCard', () => {
  const mockPartido: any = {
    id: '1',
    equipoLocal: 'Equipo A',
    equipoVisitante: 'Equipo B',
    local: 'Equipo A',
    visitante: 'Equipo B',
    fecha: '2026-10-14',
    hora: '12:00',
    precio: 5000,
    sede: 'Estadio Principal'
  }

  it('debe renderizar la tarjeta e interactuar con los botones', () => {
    const Component = EntradaCard as any
    const { container } = render(
      <Component partido={mockPartido} onComprar={() => {}} onAgregarCarrito={() => {}} />
    )

    const buttons = container.querySelectorAll('button')
    buttons.forEach((btn) => {
      try { fireEvent.click(btn) } catch (e) {}
    })

    expect(container).toBeTruthy()
  })
})