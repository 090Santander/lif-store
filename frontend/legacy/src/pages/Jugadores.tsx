import { useState } from 'react'
import PageHero from '../components/PageHero'
import JugadorCard from '../components/JugadorCard'
import { DatosLIF, type Jugador } from '../data/datosLIF'

export default function Jugadores() {
  const [jugadores] = useState(() => DatosLIF.get<Jugador>('jugadores'))
  const [busqueda, setBusqueda] = useState('')

  const termino = busqueda.trim().toLowerCase()
  const filtrados = jugadores.filter(
    (j) =>
      j.nombre.toLowerCase().includes(termino) ||
      (j.equipo ?? '').toLowerCase().includes(termino),
  )

  return (
    <>
      <PageHero
        etiqueta="Estadísticas"
        titulo="Ficha de Jugadores"
        subtitulo="Busca y consulta el rendimiento de los jugadores de la liga"
      />

      <section className="container py-5">
        <div className="row justify-content-center mb-4">
          <div className="col-md-8 col-lg-6">
            <div className="input-group shadow-sm rounded-pill overflow-hidden bg-body border border-success">
              <span className="input-group-text bg-body border-0 ps-3" aria-hidden="true">🔍</span>
              <input
                type="text"
                className="form-control border-0 py-2 shadow-none"
                placeholder="Buscar por jugador o equipo (ej: Carlos Pérez, Mónica FC)..."
                aria-label="Buscar por jugador o equipo"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>

        {jugadores.length === 0 ? (
          <p className="text-center text-body-secondary py-4">No hay jugadores registrados en la liga.</p>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-5">
            <span className="fs-1" aria-hidden="true">⚽</span>
            <p className="text-body-secondary fw-semibold mt-2">
              No se encontraron jugadores que coincidan con el filtro.
            </p>
          </div>
        ) : (
          <div className="row g-3">
            {filtrados.map((j) => (
              <JugadorCard key={j.id} jugador={j} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}