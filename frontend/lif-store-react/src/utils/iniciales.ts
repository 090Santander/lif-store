export const obtenerIniciales = (nombre?: string): string => {
  if (!nombre || !nombre.trim()) {
    return '?'
  }
  const partes = nombre.trim().split(/\s+/)
  if (partes.length === 1) {
    return partes[0].charAt(0).toUpperCase()
  }
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase()
}