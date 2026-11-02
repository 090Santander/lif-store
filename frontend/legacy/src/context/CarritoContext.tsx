/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Partido } from '../data/datosLIF'
import { crearTicket, type Ticket } from '../utils/carrito'

const KEY_CARRITO = 'LIF_CARRITO_ENTRADAS'

function leerCarrito(): Ticket[] {
  try {
    const raw = localStorage.getItem(KEY_CARRITO)
    return raw ? (JSON.parse(raw) as Ticket[]) : []
  } catch {
    return []
  }
}

interface CarritoContextValue {
  tickets: Ticket[]
  cantidad: number
  agregar: (partido: Partido) => Ticket
  eliminar: (idUnico: number) => void
  vaciar: () => void
}

const CarritoContext = createContext<CarritoContextValue | null>(null)

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(leerCarrito)

  useEffect(() => {
    localStorage.setItem(KEY_CARRITO, JSON.stringify(tickets))
  }, [tickets])

  const agregar = (partido: Partido) => {
    const ticket = crearTicket(partido)
    setTickets((actual) => [...actual, ticket])
    return ticket
  }

  const eliminar = (idUnico: number) =>
    setTickets((actual) => actual.filter((t) => t.idUnico !== idUnico))

  const vaciar = () => setTickets([])

  return (
    <CarritoContext.Provider value={{ tickets, cantidad: tickets.length, agregar, eliminar, vaciar }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return ctx
}