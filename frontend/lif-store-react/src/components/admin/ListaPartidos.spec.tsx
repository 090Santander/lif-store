import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import ListaPartidos from './ListaPartidos'

describe('Componente ListaPartidos (ListaPartidos.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe mostrar un mensaje cuando no hay partidos registrados', () => {
    render(<ListaPartidos partidos={[]} onEliminar={() => {}} />)
    expect(screen.getByText('No hay partidos registrados.')).toBeTruthy()
  })

  it('debe renderizar la lista de partidos y permitir eliminar cuando se confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    const onEliminar = jasmine.createSpy('onEliminar')
    const partidos = [
      {
        id: 1,
        equipoLocal: 'Cracks FC',
        equipoVisitante: 'Zánganos FC',
        fecha: '12 SEPT',
        hora: '16:00',
        sede: 'Cancha 1',
        fase: 'Final',
        precio: 5000,
      },
    ]

    render(<ListaPartidos partidos={partidos as any} onEliminar={onEliminar} />)

    expect(screen.getByText('Cracks FC vs Zánganos FC')).toBeTruthy()
    expect(screen.getByText('Final')).toBeTruthy()

    fireEvent.click(screen.getByText('Eliminar'))
    expect(window.confirm).toHaveBeenCalledWith('¿Eliminar partido?')
    expect(onEliminar).toHaveBeenCalledWith(1)
  })

  it('no debe eliminar el partido si el usuario cancela la confirmación', () => {
    spyOn(window, 'confirm').and.returnValue(false)
    const onEliminar = jasmine.createSpy('onEliminar')
    const partidos = [
      {
        id: 2,
        equipoLocal: 'A',
        equipoVisitante: 'B',
        fecha: '10 OCT',
        hora: '18:00',
        sede: 'Cancha 2',
        fase: 'Semifinal',
        precio: 3000,
      },
    ]

    render(<ListaPartidos partidos={partidos as any} onEliminar={onEliminar} />)
    fireEvent.click(screen.getByText('Eliminar'))
    expect(onEliminar).not.toHaveBeenCalled()
  })
})