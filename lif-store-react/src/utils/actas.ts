import { actas, type Acta } from '../data/actas'

interface ActaBuscable {
  titulo?: string
  fecha?: string
  anio?: number | string
  equipoLocal?: string
  equipoVisitante?: string
  equipoVisita?: string
  local?: string
  visita?: string
  golesLocal?: number | string
  golesVisita?: number | string
  golesL?: number | string
  golesV?: number | string
  sanciones?: SancionBuscable[]
}

interface SancionBuscable {
  jugador?: string
  equipo?: string
  falta?: string
  motivo?: string
}

function normalizar(valor: unknown): string {
  return typeof valor === 'string' || typeof valor === 'number' ? String(valor).toLowerCase() : ''
}

export function obtenerActas(lista?: Acta[] | null): Acta[] {
  if (lista === null) return []
  return lista || actas
}

export function filtrarActas<T extends ActaBuscable>(actasArray: T[] | null | undefined, busqueda: string): T[] {
  if (!actasArray || !Array.isArray(actasArray)) return []
  if (!busqueda || !busqueda.trim()) return actasArray

  const q = busqueda.toLowerCase().trim()
  return actasArray.filter((a) => {
    const equipoVisita = a.equipoVisitante ?? a.equipoVisita ?? a.visita
    const titulo = a.titulo || (a.equipoLocal ? `${a.equipoLocal} ${a.golesLocal} - ${a.golesVisita ?? a.golesV} ${equipoVisita}` : '')

    return (
      normalizar(titulo).includes(q) ||
      normalizar(a.fecha ?? a.anio).includes(q) ||
      (a.sanciones || []).some(
        (s) => [s.jugador, s.equipo, s.falta, s.motivo].some((campo) => normalizar(campo).includes(q))
      )
    )
  })
}

export function formatearResumenActa(acta: ActaBuscable | null | undefined): string {
  if (!acta) return '';
  if (acta.titulo) return acta.titulo;

  const local = acta.equipoLocal || acta.local || 'Macul FC'
  const visita = acta.equipoVisitante || acta.equipoVisita || acta.visita || 'Real Santiago'
  const golesL = acta.golesLocal ?? acta.golesL ?? 2
  const golesV = acta.golesVisita ?? acta.golesV ?? 1

  return `${local} ${golesL} - ${golesV} ${visita}`
}

export function filtrarSanciones<T extends SancionBuscable>(sanciones: T[] | null | undefined, busqueda: string): T[] {
  if (!sanciones || !Array.isArray(sanciones)) return []
  if (!busqueda || !busqueda.trim()) return sanciones

  const q = busqueda.toLowerCase().trim()
  return sanciones.filter((s) =>
    [s.jugador, s.equipo, s.falta, s.motivo].some((campo) => normalizar(campo).includes(q)),
  )
}
