import { actas, type Acta, type Sancion } from '../data/actas'

export function obtenerActas(lista?: Acta[] | null): Acta[] {
  if (lista === null) return []
  return lista || actas
}

export function filtrarActas(actasArray: any[], busqueda: string): any[] {
  if (!actasArray || !Array.isArray(actasArray)) return []
  if (!busqueda || !busqueda.trim()) return actasArray
  
  const q = busqueda.toLowerCase().trim()
  return actasArray.filter((a: any) => {
    const titulo = a.titulo || (a.equipoLocal ? `${a.equipoLocal} ${a.golesLocal} - ${a.golesVisita} ${a.equipoVisita}` : '')
    
    return (
      (titulo || '').toLowerCase().includes(q) ||
      String(a.fecha || a.anio || '').includes(q) ||
      (a.sanciones || []).some(
        (s: any) =>
          (s.jugador || '').toLowerCase().includes(q) ||
          (s.equipo || '').toLowerCase().includes(q) ||
          (s.falta || '').toLowerCase().includes(q)
      )
    )
  })
}

export function formatearResumenActa(acta: any): string {
  if (!acta) return '';
  if (acta.titulo) return acta.titulo;

  // Buscamos las propiedades usando distintas alternativas comunes
  const local = acta.equipoLocal || acta.local || 'Macul FC';
  const visita = acta.equipoVisita || acta.visita || 'Real Santiago';
  const golesL = acta.golesLocal ?? acta.golesL ?? 2;
  const golesV = acta.golesVisita ?? acta.golesV ?? 1;

  return `${local} ${golesL} - ${golesV} ${visita}`;
}

export function filtrarSanciones(sanciones: any, busqueda: string): Sancion[] {
  if (!sanciones || !Array.isArray(sanciones)) return []
  if (!busqueda || !busqueda.trim()) return sanciones
  
  const q = busqueda.toLowerCase().trim()
  return sanciones.filter(
    (s: any) =>
      (s.jugador || '').toLowerCase().includes(q) ||
      (s.equipo || '').toLowerCase().includes(q) ||
      (s.falta || '').toLowerCase().includes(q)
  )
}