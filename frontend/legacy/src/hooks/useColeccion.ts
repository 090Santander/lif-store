import { useState } from 'react'
import { DatosLIF, type ClaveColeccion } from '../data/datosLIF'

export function useColeccion<T extends { id: number }>(clave: ClaveColeccion) {
  const [items, setItems] = useState<T[]>(() => DatosLIF.get<T>(clave))

  const agregar = (item: Omit<T, 'id'>) => {
    DatosLIF.agregar(clave, item)
    setItems(DatosLIF.get<T>(clave))
  }

  const eliminar = (id: number) => {
    DatosLIF.eliminar(clave, id)
    setItems(DatosLIF.get<T>(clave))
  }

  const actualizar = (id: number, cambios: Partial<T>) => {
    const nueva = DatosLIF.get<T>(clave).map((i) => (i.id === id ? { ...i, ...cambios } : i))
    DatosLIF.guardar(clave, nueva)
    setItems(nueva)
  }

  return { items, agregar, eliminar, actualizar }
}