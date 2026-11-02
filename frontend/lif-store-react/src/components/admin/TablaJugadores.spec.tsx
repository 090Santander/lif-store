import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import TablaJugadores from './TablaJugadores'
import type { Jugador } from '../../data/datosLIF'

const crearJugador = (o: Partial<Jugador> = {}) =>
  ({ id: 1, nombre: 'Carlos Pérez', equipo: 'Mónica FC', posicion: 'Delantero', dorsal: 9, ...o }) as unknown as Jugador

describe('Componente TablaJugadores (TablaJugadores.spec.tsx)', () => {
  afterEach(() => cleanup())

  it('debe mostrar un mensaje cuando no hay jugadores', () => {
    render(<TablaJugadores jugadores={[]} onEliminar={() => {}} onEditarStats={() => {}} />)
    expect(screen.getByText('No hay jugadores registrados.')).toBeTruthy()
  })

  it('debe listar los datos de cada jugador', () => {
    render(<TablaJugadores jugadores={[crearJugador()]} onEliminar={() => {}} onEditarStats={() => {}} />)
    expect(screen.getByText('Carlos Pérez')).toBeTruthy()
    expect(screen.getByText('Mónica FC')).toBeTruthy()
    expect(screen.getByText('Delantero')).toBeTruthy()
    expect(screen.getByText('#9')).toBeTruthy()
    expect(screen.queryByText('No hay jugadores registrados.')).toBeNull()
  })

  it('debe llamar a onEditarStats con el jugador al pulsar Stats', () => {
    const onEditarStats = jasmine.createSpy('onEditarStats')
    const jugador = crearJugador()
    render(<TablaJugadores jugadores={[jugador]} onEliminar={() => {}} onEditarStats={onEditarStats} />)
    fireEvent.click(screen.getByText(/Stats/))
    expect(onEditarStats).toHaveBeenCalledWith(jugador)
  })

  it('debe eliminar al jugador cuando el usuario confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    const onEliminar = jasmine.createSpy('onEliminar')
    render(<TablaJugadores jugadores={[crearJugador({ id: 7 })]} onEliminar={onEliminar} onEditarStats={() => {}} />)
    fireEvent.click(screen.getByText('Eliminar'))
    expect(onEliminar).toHaveBeenCalledWith(7)
  })

  it('no debe eliminar al jugador cuando el usuario cancela', () => {
    spyOn(window, 'confirm').and.returnValue(false)
    const onEliminar = jasmine.createSpy('onEliminar')
    render(<TablaJugadores jugadores={[crearJugador()]} onEliminar={onEliminar} onEditarStats={() => {}} />)
    fireEvent.click(screen.getByText('Eliminar'))
    expect(onEliminar).not.toHaveBeenCalled()
  })
})