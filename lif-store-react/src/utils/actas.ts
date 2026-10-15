export interface Sancion {
  id: string
  jugador: string
  equipo: string
  tipo: 'amarilla' | 'roja' | 'suspencion' | 'sancion'
  motivo?: string
  partidos?: number
}

export interface Acta {
  id: string
  partido: string
  fecha: string
  equipoLocal: string
  equipoVisitante: string
  golesLocal: number
  golesVisitante: number
  sanciones?: Sancion[]
  observaciones?: string
}

export function filtrarSanciones(sanciones: Sancion[] = [], filtro: string = ''): Sancion[] {
  if (!Array.isArray(sanciones)) return []
  if (!filtro.trim()) return sanciones
  const f = filtro.toLowerCase().trim()
  return sanciones.filter(
    (s) =>
      (s.jugador && s.jugador.toLowerCase().includes(f)) ||
      (s.equipo && s.equipo.toLowerCase().includes(f)) ||
      (s.tipo && s.tipo.toLowerCase().includes(f)) ||
      (s.motivo && s.motivo.toLowerCase().includes(f))
  )
}

export function obtenerActas(actas: Acta[] = []): Acta[] {
  return Array.isArray(actas) ? actas : []
}

export function filtrarActas(actas: Acta[] = [], busqueda: string = ''): Acta[] {
  if (!Array.isArray(actas)) return []
  if (!busqueda.trim()) return actas
  const b = busqueda.toLowerCase().trim()
  return actas.filter(
    (a) =>
      (a.partido && a.partido.toLowerCase().includes(b)) ||
      (a.equipoLocal && a.equipoLocal.toLowerCase().includes(b)) ||
      (a.equipoVisitante && a.equipoVisitante.toLowerCase().includes(b))
  )
}

export function formatearResumenActa(acta: Acta): string {
  if (!acta) return ''
  return `${acta.equipoLocal || ''} ${acta.golesLocal ?? 0} - ${acta.golesVisitante ?? 0} ${acta.equipoVisitante || ''}`
}