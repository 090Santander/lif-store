import PageHero from '../components/PageHero'
import EntradaCard from '../components/EntradaCard'
import type { Partido } from '../data/datosLIF'
import { useCarrito } from '../context/CarritoContext'
import { useColeccion } from '../hooks/useColeccion'
import { precioDe } from '../utils/carrito'

export default function Entradas() {
  const { items: partidos, cargando, error, recargar } = useColeccion<Partido>('partidos')
  const { agregarAlCarrito } = useCarrito()

  const comprar = (partido: Partido) => {
    const encuentro = `${partido.equipoLocal} vs ${partido.equipoVisitante}`
    agregarAlCarrito({
      id: partido.id,
      partidoId: partido.id,
      nombre: encuentro,
      encuentro,
      precio: precioDe(partido),
      cantidad: 1,
      fecha: `${partido.fecha} ${partido.hora ?? ''}`.trim(),
      localidad: partido.fase || 'General',
      sede: partido.sede,
    })
    alert(`🎟️ Entrada agregada al carrito.\n${encuentro}`)
  }

  return (
    <>
      <PageHero
        etiqueta="Boletería Oficial"
        titulo="Compra tus e-Tickets"
        subtitulo="Asegura tu entrada digital para la próxima jornada"
      />

      <section className="container py-5">
        <h2 className="h5 fw-bold text-uppercase mb-4">
          Próximos Partidos Disponibles
        </h2>

        {error && <div className="alert alert-danger" role="alert">{error} <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => void recargar()}>Reintentar</button></div>}
        {cargando ? (
          <p className="text-center text-body-secondary py-4" role="status">Cargando partidos…</p>
        ) : partidos.length === 0 ? (
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
      </section>
    </>
  )
}
