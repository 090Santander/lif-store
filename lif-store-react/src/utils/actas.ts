import type { Sancion } from '../data/actas'

export function filtrarSanciones(sanciones: Sancion[], termino: string): Sancion[] {
  const t = termino.trim().toLowerCase()
  if (!t) return sanciones

  return sanciones.filter(
    (s) => s.jugador.toLowerCase().includes(t) || s.equipo.toLowerCase().includes(t),
  )
}