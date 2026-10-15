import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Partidos from './Partidos'
import { DatosLIF } from '../data/datosLIF'

const base = { fecha: '12 oct', hora: '16:00', sede: 'Cancha 1' }

function montar(datos: unknown[]) {
  spyOn(DatosLIF, 'get').and.returnValue(datos as never)
  return render(<MemoryRouter><Partidos /></MemoryRouter>)
}

describe('Página Partidos (Partidos.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe mostrar un mensaje cuando no hay partidos programados', () => {
    montar([])
    expect(screen.getByText('No hay partidos programados por el momento.')).toBeTruthy()
  })

  it('debe mostrar el resultado cuando hay goles de ambos equipos', () => {
    montar([{ id: 1, ...base, equipoLocal: 'Mónica FC', equipoVisitante: 'Cracks FC', golesLocal: 2, golesVisita: 1, estado: 'Finalizado' }])
    expect(screen.getByText('2 - 1')).toBeTruthy()
    expect(screen.getByText('Finalizado')).toBeTruthy()
    expect(screen.getByText('Mónica FC')).toBeTruthy()
    expect(screen.getByText('Cracks FC')).toBeTruthy()
  })

  it('debe mostrar "vs" y estado "Programado" cuando no hay resultado ni estado', () => {
    montar([{ id: 2, ...base, equipoLocal: 'A', equipoVisitante: 'B' }])
    expect(screen.getByText('vs')).toBeTruthy()
    expect(screen.getByText('Programado')).toBeTruthy()
  })

  it('debe mostrar "vs" si falta el gol de alguno de los equipos', () => {
    montar([
      { id: 3, ...base, equipoLocal: 'C', equipoVisitante: 'D', golesLocal: 1 },
      { id: 4, ...base, equipoLocal: 'E', equipoVisitante: 'F', golesVisita: 1 },
    ])
    expect(screen.getAllByText('vs').length).toBe(2)
  })
})