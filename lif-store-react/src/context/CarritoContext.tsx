import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface ItemCarrito {
  id: number | string
  nombre: string
  precio: number
  cantidad: number
  tipo?: string
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

export function CarritoProvider({ children }: { children: ReactNode }) {
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
      console.error('Error al guardar el carrito en localStorage', e)
    }
  }, [carrito])

  const agregarAlCarrito = (item: ItemCarrito) => {
    setCarrito((prev) => {
      const existe = prev.find((i) => i.id === item.id)
      if (existe) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, cantidad: i.cantidad + (item.cantidad || 1) } : i
        )
      }
      return [...prev, { ...item, cantidad: item.cantidad || 1 }]
    })
  }

  const eliminarDelCarrito = (id: number | string) => {
    setCarrito((prev) => prev.filter((i) => i.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const obtenerTotal = () => {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  }

  const obtenerCantidadTotal = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0)
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

export function useCarrito() {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider')
  }
  return context
}