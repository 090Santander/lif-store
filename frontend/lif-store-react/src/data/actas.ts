export interface Sancion {
  jugador: string
  equipo: string
  falta: string
  tipo: 'roja' | 'amarilla'
  sancion: string
}

export interface Acta {
  numero: number
  titulo: string
  ultima: boolean
  sanciones?: Sancion[]
  resumen?: string
  textoDescarga: string
}

export const actas: Acta[] = [
  {
    numero: 5,
    titulo: 'Resoluciones Fecha 5 (Última)',
    ultima: true,
    textoDescarga: '📥 Descargar PDF completo',
    sanciones: [
      { jugador: 'Juan Pérez', equipo: 'Cracks FC', falta: '🟥 Tarjeta Roja Directa', tipo: 'roja', sancion: '2 Fechas' },
      { jugador: 'Diego López', equipo: 'Zánganos FC', falta: '🟨 Acumulación Amarillas', tipo: 'amarilla', sancion: '1 Fecha' },
    ],
  },
  {
    numero: 4,
    titulo: 'Resoluciones Fecha 4',
    ultima: false,
    textoDescarga: '📥 Descargar PDF N° 04',
    resumen:
      'Las resoluciones de esta fecha ya han sido cumplidas en su mayoría. Para ver el detalle histórico, descarga el documento oficial.',
  },
]