import { useEffect, useState } from 'react'
import FormNoticia from '../components/admin/FormNoticia'
import ListaNoticias from '../components/admin/ListaNoticias'
import FormPartido from '../components/admin/FormPartido'
import ListaPartidos from '../components/admin/ListaPartidos'
import FormJugador from '../components/admin/FormJugador'
import TablaJugadores from '../components/admin/TablaJugadores'
import PanelSolicitudes from '../components/admin/PanelSolicitudes'
import PanelOrdenes from '../components/admin/PanelOrdenes'
import ModalStats, { type Estadisticas } from '../components/admin/ModalStats'
import { useColeccion } from '../hooks/useColeccion'
import type { Jugador, Noticia, OrdenEntrada, Partido, Solicitud } from '../data/datosLIF'
import { apiGet, mensajeApi } from '../api/client'

type Pestana = 'noticias' | 'partidos' | 'jugadores' | 'solicitud' | 'entradas'

const pestanas: { clave: Pestana; icono: string; texto: string }[] = [
  { clave: 'noticias', icono: '📰', texto: 'Gestor de Noticias' },
  { clave: 'partidos', icono: '⚽', texto: 'Partidos, Entradas y Noticias' },
  { clave: 'jugadores', icono: '🏃', texto: 'Gestor de Jugadores' },
  { clave: 'solicitud', icono: '📨', texto: 'Solicitudes' },
  { clave: 'entradas', icono: '🎟️', texto: 'Órdenes de entradas' },
]

export default function Admin() {
  const [pestana, setPestana] = useState<Pestana>('noticias')
  const [editando, setEditando] = useState<Jugador | null>(null)
  const [ordenes, setOrdenes] = useState<OrdenEntrada[]>([])
  const [ordenesCargando, setOrdenesCargando] = useState(true)
  const [ordenesError, setOrdenesError] = useState<string | null>(null)

  const noticias = useColeccion<Noticia>('noticias')
  const partidos = useColeccion<Partido>('partidos')
  const jugadores = useColeccion<Jugador>('jugadores')
  const solicitudes = useColeccion<Solicitud>('solicitudes')
  const pendientes = solicitudes.items.filter((s) => s.estado === 'Pendiente').length

  useEffect(() => {
    let activo = true
    apiGet<OrdenEntrada[]>('/entradas')
      .then((respuesta) => {
        if (activo) setOrdenes(respuesta)
      })
      .catch((e: unknown) => {
        if (activo) setOrdenesError(mensajeApi(e))
      })
      .finally(() => {
        if (activo) setOrdenesCargando(false)
      })
    return () => { activo = false }
  }, [])

  const guardarStats = async (stats: Estadisticas) => {
    if (!editando) return
    if (await jugadores.actualizar(editando.id, stats)) {
      setEditando(null)
      alert('Estadísticas guardadas con éxito')
    }
  }

  const erroresApi = [...new Set([noticias.error, partidos.error, jugadores.error, solicitudes.error, ordenesError]
    .filter((error): error is string => error !== null))]
  const cargando = noticias.cargando || partidos.cargando || jugadores.cargando || solicitudes.cargando || ordenesCargando

  return (
    <div className="container py-4">
      <h1 className="fw-bold mb-4">Panel de Administración</h1>

      {erroresApi.map((error) => (
        <div key={error} className="alert alert-danger" role="alert">{error}</div>
      ))}
      {cargando && <p className="text-body-secondary" role="status">Cargando datos del panel…</p>}

      <ul className="nav nav-tabs mb-4" role="tablist">
        {pestanas.map((p) => (
          <li className="nav-item" role="presentation" key={p.clave}>
            <button
              type="button"
              role="tab"
              aria-selected={pestana === p.clave}
              className={`nav-link fw-bold text-success ${pestana === p.clave ? 'active' : ''}`}
              onClick={() => setPestana(p.clave)}
            >
              <span aria-hidden="true">{p.icono}</span> {p.texto}
               {p.clave === 'solicitud' && pendientes > 0 && (
              <span className="badge bg-danger ms-2">{pendientes}</span>
   )}
            </button>
          </li>
        ))}
      </ul>

      {pestana === 'noticias' && (
        <div className="row g-4">
          <div className="col-md-5">
            <FormNoticia
              prefijo="n"
              titulo="Publicar Nueva Noticia"
              categorias={['Oficial', 'Deportes', 'Tribunal', 'Infraestructura']}
              placeholders={{
                titulo: 'Ej: Gran Final de la Liguilla 2026',
                fecha: 'Ej: Hoy / Hace 2 hrs',
                resumen: 'Escribe el resumen o cuerpo de la publicación...',
              }}
              textoBoton="Publicar Noticia"
              onAgregar={noticias.agregar}
            />
          </div>
          <div className="col-md-7">
            <ListaNoticias titulo="Noticias Publicadas" noticias={noticias.items} onEliminar={noticias.eliminar} />
          </div>
        </div>
      )}

      {pestana === 'partidos' && (
        <div className="row g-4">
          <div className="col-md-5">
            <FormPartido onAgregar={partidos.agregar} />
            <FormNoticia
              prefijo="np"
              titulo={<><span aria-hidden="true">📰</span> Agregar Noticia de Partido</>}
              categorias={['Deportes', 'Oficial']}
              placeholders={{
                titulo: 'Ej: Venta de Entradas Habilitada',
                fecha: 'Ej: Hace 10 min',
                resumen: 'Breve actualización del encuentro...',
              }}
              filas={2}
              textoBoton="Publicar Noticia"
              claseBoton="btn-outline-success"
              onAgregar={noticias.agregar}
            />
          </div>
          <div className="col-md-7">
            <ListaPartidos partidos={partidos.items} onEliminar={partidos.eliminar} />
            <ListaNoticias titulo="Últimas Noticias" noticias={noticias.items} onEliminar={noticias.eliminar} />
          </div>
        </div>
      )}

      {pestana === 'jugadores' && (
        <div className="row g-4">
          <div className="col-md-5">
            <FormJugador onAgregar={jugadores.agregar} />
          </div>
          <div className="col-md-7">
            <TablaJugadores
              jugadores={jugadores.items}
              onEliminar={jugadores.eliminar}
              onEditarStats={setEditando}
            />
          </div>
        </div>
      )}
      {pestana === 'solicitud' && (
     <PanelSolicitudes
       solicitudes={solicitudes.items}
       onCambiarEstado={(id, estado) => solicitudes.actualizar(id, { estado })}
       onEliminar={solicitudes.eliminar}
     />
   )}

      {editando && (
        <ModalStats
          key={editando.id}
          jugador={editando}
          onGuardar={guardarStats}
          onCerrar={() => setEditando(null)}
        />
      )}
      {pestana === 'entradas' && <PanelOrdenes ordenes={ordenes} />}
    </div>
  )
}
