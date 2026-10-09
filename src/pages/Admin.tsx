import { useState } from 'react'
import PageHero from '../components/PageHero'
import PanelNoticias from '../components/admin/PanelNoticias'
import PanelPartidos from '../components/admin/PanelPartidos'
import PanelJugadores from '../components/admin/PanelJugadores'
import ModalStats, { type Estadisticas } from '../components/admin/ModalStats'
import { useColeccion } from '../hooks/useColeccion'
import type { Jugador, Noticia, Partido } from '../data/datosLIF'

type Pestana = 'noticias' | 'partidos' | 'jugadores'

const pestanas: { clave: Pestana; texto: string }[] = [
  { clave: 'noticias', texto: '📰 Noticias' },
  { clave: 'partidos', texto: '⚽ Partidos' },
  { clave: 'jugadores', texto: '👤 Jugadores' },
]

export default function Admin() {
  const [pestana, setPestana] = useState<Pestana>('noticias')
  const [editando, setEditando] = useState<Jugador | null>(null)

  const noticias = useColeccion<Noticia>('noticias')
  const partidos = useColeccion<Partido>('partidos')
  const jugadores = useColeccion<Jugador>('jugadores')

  const guardarStats = (stats: Estadisticas) => {
    if (!editando) return
    jugadores.actualizar(editando.id, stats)
    setEditando(null)
    alert('Estadísticas guardadas con éxito')
  }

  return (
    <>
      <PageHero etiqueta="Administración" titulo="Panel de Control" />

      <section className="container py-5">
        <ul className="nav nav-tabs mb-4">
          {pestanas.map((p) => (
            <li className="nav-item" key={p.clave}>
              <button
                type="button"
                className={`nav-link fw-bold ${pestana === p.clave ? 'active' : ''}`}
                onClick={() => setPestana(p.clave)}
              >
                {p.texto}
              </button>
            </li>
          ))}
        </ul>

        {pestana === 'noticias' && (
          <PanelNoticias
            noticias={noticias.items}
            onAgregar={noticias.agregar}
            onEliminar={noticias.eliminar}
          />
        )}

        {pestana === 'partidos' && (
          <>
            <PanelPartidos
              partidos={partidos.items}
              onAgregar={partidos.agregar}
              onEliminar={partidos.eliminar}
            />
            <h2 className="h5 fw-bold mt-5 mb-3">Noticias de partidos</h2>
            <PanelNoticias
              noticias={noticias.items}
              onAgregar={noticias.agregar}
              onEliminar={noticias.eliminar}
            />
          </>
        )}

        {pestana === 'jugadores' && (
          <PanelJugadores
            jugadores={jugadores.items}
            onAgregar={jugadores.agregar}
            onEliminar={jugadores.eliminar}
            onEditarStats={setEditando}
          />
        )}
      </section>

      {editando && (
        <ModalStats
          key={editando.id}
          jugador={editando}
          onGuardar={guardarStats}
          onCerrar={() => setEditando(null)}
        />
      )}
    </>
  )
}