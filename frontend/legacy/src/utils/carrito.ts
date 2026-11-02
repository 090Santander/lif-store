import type { Partido } from '../data/datosLIF'

export interface Ticket {
  idUnico: number
  encuentro: string
  localidad: string
  precio: number
  fecha: string
}

export const PRECIO_POR_DEFECTO = 5000
export const CARGO_SERVICIO = 0.1 // 10 %

export function precioDe(partido: Partido): number {
  return Number(partido.precio) || PRECIO_POR_DEFECTO
}

export function crearTicket(partido: Partido): Ticket {
  return {
    idUnico: Date.now() + Math.floor(Math.random() * 1000),
    encuentro: `${partido.equipoLocal} vs ${partido.equipoVisitante}`,
    localidad: partido.fase || 'General',
    precio: precioDe(partido),
    fecha: `${partido.fecha} ${partido.hora}`.trim(),
  }
}

export function calcularResumen(tickets: Ticket[]) {
  const subtotal = tickets.reduce((suma, t) => suma + (Number(t.precio) || 0), 0)
  const cargo = subtotal > 0 ? Math.round(subtotal * CARGO_SERVICIO) : 0
  return { subtotal, cargo, total: subtotal + cargo }
}