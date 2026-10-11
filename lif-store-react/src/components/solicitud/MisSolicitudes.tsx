import type { Solicitud } from '../../data/datosLIF'
import TarjetaSolicitud from './TarjetaSolicitud'

interface MisSolicitudesProps {
  solicitudes: Solicitud[]
  onCancelar: (id: number) => void
}

export default function MisSolicitudes({ solicitudes, onCancelar }: MisSolicitudesProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <h2 className="fs-5 fw-bold mb-3">Mis solicitudes</h2>
      <ul className="list-group list-group-flush">
        {solicitudes.length === 0 ? (
          <li className="list-group-item text-body-secondary">Aún no has enviado solicitudes.</li>
        ) : (
          solicitudes.map((s) => (
            <TarjetaSolicitud key={s.id} solicitud={s}>
              {s.estado === 'Pendiente' && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger rounded-pill"
                  onClick={() => confirm('¿Cancelar esta solicitud?') && onCancelar(s.id)}
                >
                  Cancelar solicitud
                </button>
              )}
            </TarjetaSolicitud>
          ))
        )}
      </ul>
    </div>
  )
}