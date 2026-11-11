import { useCallback, useEffect, useState } from 'react'
import { apiDelete, apiGet, apiPatch, apiPost, apiPut, mensajeApi } from '../api/client'
import type { ClaveColeccion } from '../data/datosLIF'

const ENDPOINTS: Record<ClaveColeccion, string> = {
  noticias: '/noticias',
  partidos: '/partidos',
  jugadores: '/jugadores',
  solicitudes: '/solicitudes',
  usuarios: '/usuarios',
}

export function useColeccion<T extends { id: number }>(clave: ClaveColeccion) {
  const endpoint = ENDPOINTS[clave]
  const [items, setItems] = useState<T[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargar = useCallback(async () => {
    try {
      const respuesta = await apiGet<T[]>(endpoint)
      setItems(respuesta)
      setError(null)
    } catch (e) {
      setError(mensajeApi(e))
    } finally {
      setCargando(false)
    }
  }, [endpoint])

  const recargar = useCallback(async () => {
    setCargando(true)
    await cargar()
  }, [cargar])

  useEffect(() => {
    let activo = true
    apiGet<T[]>(endpoint)
      .then((respuesta) => {
        if (activo) {
          setItems(respuesta)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (activo) setError(mensajeApi(e))
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => { activo = false }
  }, [endpoint])

  const agregar = async (item: Omit<T, 'id'>): Promise<boolean> => {
    setError(null)
    try {
      const creado = await apiPost<T>(endpoint, item)
      setItems((actuales) => [creado, ...actuales])
      return true
    } catch (e) {
      setError(mensajeApi(e))
      return false
    }
  }

  const eliminar = async (id: number): Promise<boolean> => {
    setError(null)
    try {
      await apiDelete(`${endpoint}/${id}`)
      setItems((actuales) => actuales.filter((item) => item.id !== id))
      return true
    } catch (e) {
      setError(mensajeApi(e))
      return false
    }
  }

  const actualizar = async (id: number, cambios: Partial<T>): Promise<boolean> => {
    setError(null)
    try {
      let actualizado: T
      if (clave === 'solicitudes' && 'estado' in cambios) {
        actualizado = await apiPatch<T>(`${endpoint}/${id}/estado`, { estado: cambios.estado })
      } else {
        const existente = items.find((item) => item.id === id)
        if (!existente) throw new Error('No se encontró el elemento que deseas actualizar.')
        const datosExistentes = Object.fromEntries(
          Object.entries(existente).filter(([campo]) => campo !== 'id'),
        )
        const datosCambio = Object.fromEntries(
          Object.entries(cambios).filter(([campo]) => campo !== 'id'),
        )
        actualizado = await apiPut<T>(`${endpoint}/${id}`, { ...datosExistentes, ...datosCambio })
      }
      setItems((actuales) => actuales.map((item) => item.id === id ? actualizado : item))
      return true
    } catch (e) {
      setError(mensajeApi(e))
      return false
    }
  }

  return { items, cargando, error, recargar, agregar, eliminar, actualizar }
}
