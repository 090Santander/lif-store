import { render, screen } from '@testing-library/react'
import JugadorCard from './JugadorCard'
import type { Jugador } from '../data/datosLIF'
import { obtenerIniciales } from '../utils/iniciales'

const jugadorBase = {
  nombre: 'Carlos Pérez',
  posicion: 'Delantero',
  equipo: 'Deportivo Norte',
  dorsal: 9,
  pj: 12,
  goles: 7,
  ta: 3,
  tr: 1,
} as unknown as Jugador

const conJugador = (extra: Record<string, unknown>) =>
  ({ ...jugadorBase, ...extra }) as unknown as Jugador

describe('JugadorCard', () => {
  it('muestra nombre, posición, equipo y dorsal', () => {
    render(<JugadorCard jugador={jugadorBase} />)

    expect(screen.getByText('Carlos Pérez')).toBeTruthy()
    expect(screen.getByText('Delantero')).toBeTruthy()
    expect(screen.getByText(/Deportivo Norte \| Dorsal #9/)).toBeTruthy()
  })

  it('muestra las iniciales del jugador en el avatar', () => {
    render(<JugadorCard jugador={jugadorBase} />)

    expect(screen.getByText(obtenerIniciales('Carlos Pérez'))).toBeTruthy()
  })

  it('muestra las estadísticas del jugador', () => {
    render(<JugadorCard jugador={jugadorBase} />)

    expect(screen.getByText('12')).toBeTruthy()
    expect(screen.getByText('7')).toBeTruthy()
    expect(screen.getByText('3')).toBeTruthy()
    expect(screen.getByText('1')).toBeTruthy()
    expect(screen.getByText('PJ')).toBeTruthy()
    expect(screen.getByText('Goles')).toBeTruthy()
    expect(screen.getByText('TA')).toBeTruthy()
    expect(screen.getByText('TR')).toBeTruthy()
  })

  it('usa valores por defecto cuando faltan datos opcionales', () => {
    render(
      <JugadorCard
        jugador={conJugador({
          posicion: undefined,
          equipo: undefined,
          dorsal: undefined,
          pj: undefined,
          goles: undefined,
          ta: undefined,
          tr: undefined,
        })}
      />
    )

    expect(screen.getByText('Jugador')).toBeTruthy()
    expect(screen.getByText(/LIF \| Dorsal #0/)).toBeTruthy()
    expect(screen.getAllByText('0').length).toBe(4)
  })
})