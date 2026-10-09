export function formatearPesos(monto: number): string {
  return `$${monto.toLocaleString('es-CL')}`
}