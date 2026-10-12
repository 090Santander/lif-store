import { obtenerIniciales } from './iniciales'

describe('obtenerIniciales util', () => {
  it('debe retornar iniciales correctas', () => {
    expect(obtenerIniciales('Juan Perez')).toBe('JP')
    expect(obtenerIniciales('Juan')).toBe('J')
  })

  it('debe manejar strings vacíos sin fallar', () => {
    expect(obtenerIniciales('')).toBe('?')
    expect(obtenerIniciales('   ')).toBe('?')
  })
})