import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Partidos from './Partidos'

const base = { fecha: '12 oct', hora: '16:00', sede: 'Cancha 1' }

function montar(datos: unknown[]) {
  spyOn(window, 'fetch').and.resolveTo(new Response(JSON.stringify(datos), { headers: { 'Content-Type': 'application/json' } }))
  return render(<MemoryRouter><Partidos /></MemoryRouter>)
}

describe('Página Partidos (Partidos.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('muestra vs cuando la API devuelve marcadores nulos', async () => {
    montar([{ id: 5, ...base, equipoLocal: 'A', equipoVisitante: 'B', golesLocal: null, golesVisita: null }])
    expect(await screen.findByText('vs')).toBeTruthy()
    expect(screen.queryByText('null - null')).toBeNull()
  })

  it('conserva el empate sin goles', async () => {
    montar([{ id: 6, ...base, equipoLocal: 'A', equipoVisitante: 'B', golesLocal: 0, golesVisita: 0 }])
    expect(await screen.findByText('0 - 0')).toBeTruthy()
  })

  it('debe mostrar un mensaje cuando no hay partidos programados', async () => {
    montar([])
    expect(await screen.findByText('No hay partidos programados por el momento.')).toBeTruthy()
  })

  it('debe mostrar el resultado cuando hay goles de ambos equipos', async () => {
    montar([{ id: 1, ...base, equipoLocal: 'Mónica FC', equipoVisitante: 'Cracks FC', golesLocal: 2, golesVisita: 1, estado: 'Finalizado' }])
    expect(await screen.findByText('2 - 1')).toBeTruthy()
    expect(await screen.findByText('Finalizado')).toBeTruthy()
    expect(await screen.findByText('Mónica FC')).toBeTruthy()
    expect(await screen.findByText('Cracks FC')).toBeTruthy()
  })

  it('debe mostrar "vs" y estado "Programado" cuando no hay resultado ni estado', async () => {
    montar([{ id: 2, ...base, equipoLocal: 'A', equipoVisitante: 'B' }])
    expect(await screen.findByText('vs')).toBeTruthy()
    expect(await screen.findByText('Programado')).toBeTruthy()
  })

  it('debe mostrar "vs" si falta el gol de alguno de los equipos', async () => {
    montar([
      { id: 3, ...base, equipoLocal: 'C', equipoVisitante: 'D', golesLocal: 1 },
      { id: 4, ...base, equipoLocal: 'E', equipoVisitante: 'F', golesVisita: 1 },
    ])
    expect((await screen.findAllByText('vs')).length).toBe(2)
  })
})