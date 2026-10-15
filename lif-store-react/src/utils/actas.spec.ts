import {
  filtrarSanciones,
  obtenerActas,
  filtrarActas,
  formatearResumenActa
} from './actas'

describe('Utilidades de Actas (actas.ts)', () => {
  const mockSanciones: any[] = [
    { id: '1', jugador: 'Juan Pérez', equipo: 'Macul FC', tipo: 'amarilla', motivo: 'Falta táctica' },
    { id: '2', jugador: 'Carlos Soto', equipo: 'Real Santiago', tipo: 'roja', motivo: 'Mano' }
  ]

  const mockActas: any[] = [
    {
      id: '1',
      partido: 'Fecha 1 - Serie Honor',
      fecha: '2026-10-14',
      equipoLocal: 'Macul FC',
      equipoVisitante: 'Real Santiago',
      golesLocal: 2,
      golesVisitante: 1,
      sanciones: mockSanciones
    }
  ]

  it('debe filtrar sanciones por término de búsqueda y manejar valores nulos', () => {
    expect(filtrarSanciones(mockSanciones, 'Juan')).toHaveSize(1)
    expect(filtrarSanciones(mockSanciones, 'Macul')).toHaveSize(1)
    expect(filtrarSanciones(mockSanciones, '')).toEqual(mockSanciones)
    expect(filtrarSanciones(null as any, 'Juan')).toEqual([])
  })

  it('debe obtener y filtrar actas correctamente', () => {
    expect(obtenerActas(mockActas)).toEqual(mockActas)
    expect(obtenerActas(null as any)).toEqual([])

    expect(filtrarActas(mockActas, 'Macul')).toHaveSize(1)
    expect(filtrarActas(mockActas, '')).toEqual(mockActas)
    expect(filtrarActas(null as any, 'Macul')).toEqual([])
  })

  it('debe formatear el resumen del partido correctamente', () => {
    expect(formatearResumenActa(mockActas[0])).toBe('Macul FC 2 - 1 Real Santiago')
    expect(formatearResumenActa(null as any)).toBe('')
  })
})