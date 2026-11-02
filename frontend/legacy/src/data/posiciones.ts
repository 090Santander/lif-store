export type EstadoEquipo = 'campeon' | 'normal' | 'riesgo'
export type Categoria = 'Senior' | 'Honor' | 'Junior'

export interface EquipoPosicion {
  equipo: string
  pj: number
  pg: number
  pe: number
  pp: number
  dif: string
  pts: number
  estado: EstadoEquipo
}

export const categorias: Categoria[] = ['Senior', 'Honor', 'Junior']

export const posicionesPorCategoria: Record<Categoria, EquipoPosicion[]> = {
  Senior: [
    { equipo: 'Cracks FC', pj: 10, pg: 8, pe: 1, pp: 1, dif: '+15', pts: 25, estado: 'campeon' },
    { equipo: 'Mónica FC', pj: 10, pg: 7, pe: 2, pp: 1, dif: '+10', pts: 23, estado: 'normal' },
    { equipo: 'Los Chupas FC', pj: 10, pg: 5, pe: 3, pp: 2, dif: '+2', pts: 18, estado: 'normal' },
    { equipo: 'Zánganos FC', pj: 10, pg: 2, pe: 2, pp: 6, dif: '-8', pts: 8, estado: 'riesgo' },
    { equipo: 'Matones FC', pj: 10, pg: 0, pe: 1, pp: 9, dif: '-19', pts: 1, estado: 'riesgo' },
  ],
  // En tu app.js solo existía la tabla de una serie. Honor y Junior quedan vacías
  // hasta que tengas sus datos.
  Honor: [],
  Junior: [],
}