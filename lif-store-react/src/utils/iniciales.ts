export function obtenerIniciales(nombre: string, porDefecto = 'J'): string {
  const base = nombre.trim() || porDefecto
  return base
    .split(/\s+/)
    .map((palabra) => palabra[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}