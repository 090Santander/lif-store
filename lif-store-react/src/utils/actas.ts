import { actas, type Acta, type Sancion } from '../data/actas'

export function obtenerActas(lista?: Acta[] | null): Acta[] {
  if (lista === null) return []
  return lista || actas
}

export function filtrarActas(actasArray: Acta[], busqueda: string): Acta[] {
  if (!busqueda.trim()) return actasArray
  const q = busqueda.toLowerCase().trim()
  return actasArray.filter(
    (a) =>
      a.titulo.toLowerCase().includes(q) ||
      String((a as any).fecha || (a as any).anio || '').includes(q) ||
      a.sanciones?.some(
        (s) =>
          s.jugador.toLowerCase().includes(q) ||
          s.equipo.toLowerCase().includes(q) ||
          s.falta?.toLowerCase().includes(q)
      )
  )
}

export function formatearResumenActa(acta: Acta): string {
  const totalSanciones = acta.sanciones ? acta.sanciones.length : 0
  const fechaStr = (acta as any).fecha || (acta as any).anio || ''
  return `${acta.titulo} - ${fechaStr} (${totalSanciones} sanciones)`
}

export function filtrarSanciones(sanciones: Sancion[], busqueda: string): Sancion[] {
  if (!busqueda.trim()) return sanciones
  const q = busqueda.toLowerCase().trim()
  return sanciones.filter(
    (s) =>
      s.jugador.toLowerCase().includes(q) ||
      s.equipo.toLowerCase().includes(q) ||
      s.falta?.toLowerCase().includes(q)
  )
}