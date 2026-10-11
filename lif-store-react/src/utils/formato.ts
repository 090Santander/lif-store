export function formatearPesos(monto: number): string {
  return `$${monto.toLocaleString('es-CL')}`
}

export function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleDateString('es-CL')
}