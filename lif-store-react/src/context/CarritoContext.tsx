/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react'

export interface ItemCarrito {
  id: number | string
  partidoId: number
  nombre: string
  encuentro: string
  precio: number
  cantidad: number
  fecha: string
  localidad: string
  sede: string
}

interface CarritoContextType {
  carrito: ItemCarrito[]
  agregarAlCarrito: (item: ItemCarrito) => void
  eliminarDelCarrito: (id: number | string) => void
  vaciarCarrito: () => void
  obtenerTotal: () => number
  obtenerCantidadTotal: () => number
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
    try {
      const guardado = localStorage.getItem('carrito_lif')
      if (!guardado) return []
      const items = JSON.parse(guardado) as Partial<ItemCarrito>[]
      return items.map((item) => {
        const partidoId = Number(item.partidoId ?? item.id)
        const encuentro = item.encuentro ?? item.nombre ?? 'Partido LIF'
        return {
          id: item.id ?? partidoId,
          partidoId,
          nombre: item.nombre ?? encuentro,
          encuentro,
          precio: Number(item.precio) || 0,
          cantidad: Math.min(10, Math.max(1, Number(item.cantidad) || 1)),
          fecha: item.fecha ?? '',
          localidad: item.localidad ?? item.sede ?? 'General',
          sede: item.sede ?? item.localidad ?? '',
        }
      })
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('carrito_lif', JSON.stringify(carrito))
    } catch (e) {
      console.error('Error guardando el carrito:', e)
    }
  }, [carrito])

  const agregarAlCarrito = (item: ItemCarrito) => {
    setCarrito((prev) => {
      const existe = prev.find((i) => i.id === item.id)
      const cantidadAAgregar = Math.max(1, item.cantidad || 1)
      if (existe) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, cantidad: Math.min(10, i.cantidad + cantidadAAgregar) } : i
        )
      }
      return [...prev, { ...item, cantidad: Math.min(10, cantidadAAgregar) }]
    })
  }

  const eliminarDelCarrito = (id: number | string) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const obtenerTotal = () => {
    const subtotal = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
    return subtotal + Math.round(subtotal * 0.1)
  }

  const obtenerCantidadTotal = () => {
    return carrito.reduce((sum, item) => sum + item.cantidad, 0)
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        obtenerTotal,
        obtenerCantidadTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider')
  }
  return context
}
