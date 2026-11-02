import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Jugadores from './Jugadores'
import { DatosLIF } from '../data/datosLIF'

const lista = [
  { id: 1, nombre: 'Carlos Pérez', equipo: 'Mónica FC', posicion: 'Delantero', dorsal: 9 },
  { id: 2, nombre: 'Luis Soto', equipo: 'Cracks FC', posicion: 'Portero', dorsal: 1 },
  { id: 3, nombre: 'Sin Equipo', posicion: 'Defensa', dorsal: 4 }, // cubre la rama equipo ?? ''
]

function montar(datos: unknown[]) {
  spyOn(DatosLIF, 'get').and.returnValue(datos as never)
  return render(<MemoryRouter><Jugadores /></MemoryRouter>)
}

describe('Página Jugadores (Jugadores.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe indicar cuando no hay jugadores registrados', () => {
    montar([])
    expect(screen.getByText('No hay jugadores registrados en la liga.')).toBeTruthy()
  })

  it('debe mostrar todos los jugadores sin filtro', () => {
    montar(lista)
    expect(screen.getByText('Carlos Pérez')).toBeTruthy()
    expect(screen.getByText('Luis Soto')).toBeTruthy()
    expect(screen.getByText('Sin Equipo')).toBeTruthy()
  })

  it('debe filtrar por nombre sin distinguir mayúsculas', () => {
    montar(lista)
    fireEvent.change(screen.getByLabelText('Buscar por jugador o equipo'), { target: { value: '  CARLOS ' } })
    expect(screen.getByText('Carlos Pérez')).toBeTruthy()
    expect(screen.queryByText('Luis Soto')).toBeNull()
  })

  it('debe filtrar por equipo', () => {
    montar(lista)
    fireEvent.change(screen.getByLabelText('Buscar por jugador o equipo'), { target: { value: 'cracks' } })
    expect(screen.getByText('Luis Soto')).toBeTruthy()
    expect(screen.queryByText('Carlos Pérez')).toBeNull()
  })

  it('debe mostrar un mensaje cuando el filtro no encuentra coincidencias', () => {
    montar(lista)
    fireEvent.change(screen.getByLabelText('Buscar por jugador o equipo'), { target: { value: 'zzz' } })
    expect(screen.getByText('No se encontraron jugadores que coincidan con el filtro.')).toBeTruthy()
  })
})