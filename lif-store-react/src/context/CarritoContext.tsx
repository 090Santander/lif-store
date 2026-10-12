import React, { createContext, useContext, useState, useEffect } from 'react'

export interface ItemCarrito {
  id: number | string
  nombre: string
  precio: number
  cantidad: number
  [key: string]: any
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
      return guardado ? JSON.parse(guardado) : []
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
      const cantidadAAgregar = item.cantidad || 1
      if (existe) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, cantidad: i.cantidad + cantidadAAgregar } : i
        )
      }
      return [...prev, { ...item, cantidad: cantidadAAgregar }]
    })
  }

  const eliminarDelCarrito = (id: number | string) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const obtenerTotal = () => {
    return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
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