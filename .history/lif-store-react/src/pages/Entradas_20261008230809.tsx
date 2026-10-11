import { useState } from 'react'
import EntradaCard from '../components/EntradaCard'
import { DatosLIF, type Partido } from '../data/datosLIF'
import { useCarrito } from '../context/CarritoContext'

export default function Entradas() {
  const [partidos] = useState(() => DatosLIF.get<Partido>('partidos'))
  const { agregar } = useCarrito()

  const comprar = (partido: Partido) => {
    const ticket = agregar(partido)
    alert(`🎟️ ¡Entrada agregada al carrito!\n${ticket.encuentro}`)
  }

  return (
    
    <div className="container py-5">
      <h2 className="h5 fw-bold text-uppercase mb-4">Próximos Partidos Disponibles</h2>

      {partidos.length === 0 ? (
        <p className="text-center text-body-secondary py-4">
          No hay partidos disponibles para la compra de tickets en este momento.
        </p>
      ) : (
        <div className="row g-4">
          {partidos.map((p) => (
            <EntradaCard key={p.id} partido={p} onComprar={comprar} />
          ))}
        </div>
      )}
    </div>
  )
}