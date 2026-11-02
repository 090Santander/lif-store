import { useState } from 'react'
import TarjetaSolicitud from '../solicitud/TarjetaSolicitud'
import type { EstadoSolicitud, Solicitud } from '../../data/datosLIF'

type Filtro = 'Todas' | EstadoSolicitud

const filtros: Filtro[] = ['Todas', 'Pendiente', 'Aprobada', 'Rechazada']

interface PanelSolicitudesProps {
  solicitudes: Solicitud[]
  onCambiarEstado: (id: number, estado: EstadoSolicitud) => void
  onEliminar: (id: number) => void
}

export default function PanelSolicitudes({
  solicitudes,
  onCambiarEstado,
  onEliminar,
}: PanelSolicitudesProps) {
  const [filtro, setFiltro] = useState<Filtro>('Pendiente')

  const contar = (f: Filtro) =>
    f === 'Todas' ? solicitudes.length : solicitudes.filter((s) => s.estado === f).length

  const visibles = solicitudes
    .filter((s) => filtro === 'Todas' || s.estado === filtro)
    .sort((a, b) => b.id - a.id)

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <h2 className="fs-5 fw-bold mb-3">Solicitudes recibidas</h2>

      <div className="btn-group mb-3 flex-wrap" role="group" aria-label="Filtrar por estado">
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            className={`btn btn-sm ${filtro === f ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setFiltro(f)}
          >
            {f} ({contar(f)})
          </button>
        ))}
      </div>

      <ul className="list-group list-group-flush">
        {visibles.length === 0 ? (
          <li className="list-group-item text-body-secondary">No hay solicitudes en este estado.</li>
        ) : (
          visibles.map((s) => (
            <TarjetaSolicitud key={s.id} solicitud={s} mostrarSolicitante>
              {s.estado === 'Pendiente' && (
                <>
                  <button
                    type="button"
                    className="btn btn-sm btn-success rounded-pill fw-bold"
                    onClick={() => onCambiarEstado(s.id, 'Aprobada')}
                  >
                    ✓ Aprobar
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-warning rounded-pill fw-bold"
                    onClick={() => onCambiarEstado(s.id, 'Rechazada')}
                  >
                    ✕ Rechazar
                  </button>
                </>
              )}
              <button
                type="button"
                className="btn btn-sm btn-outline-danger rounded-pill"
                onClick={() => confirm('¿Eliminar solicitud?') && onEliminar(s.id)}
              >
                Eliminar
              </button>
            </TarjetaSolicitud>
          ))
        )}
      </ul>
    </div>
  )
}