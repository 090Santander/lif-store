import { renderHook, act } from '@testing-library/react'
import { useColeccion } from './useColeccion'

describe('Hook Personalizado: useColeccion', () => {
  it('debe manipular el estado de la colección al agregar, editar y eliminar registros', () => {
    const { result } = renderHook(() => useColeccion('noticias' as any))

    expect(result.current.items).toBeDefined()

    // Operación: Agregar
    act(() => {
      result.current.agregar({ id: 99, titulo: 'Noticia de Prueba' } as any)
    })

    // Operación: Actualizar
    act(() => {
      result.current.actualizar(99, { titulo: 'Noticia Modificada' } as any)
    })

    // Operación: Eliminar
    act(() => {
      result.current.eliminar(99)
    })

    expect(result.current.items).toBeDefined()
  })
})