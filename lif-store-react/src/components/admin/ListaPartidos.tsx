import type { Partido } from '../../data/datosLIF'
import { formatearPesos } from '../../utils/formato'

interface ListaPartidosProps {
  partidos: Partido[]
  onEliminar: (id: number) => void
}

export default function ListaPartidos({ partidos, onEliminar }: ListaPartidosProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <h2 className="fs-5 fw-bold mb-3">Partidos Registrados</h2>
      <ul className="list-group list-group-flush">
        {partidos.length === 0 ? (
          <li className="list-group-item text-body-secondary">No hay partidos registrados.</li>
        ) : (
          partidos.map((p) => (
            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center gap-2 py-3">
              <div>
                <div className="fw-bold">{p.equipoLocal} vs {p.equipoVisitante}</div>
                <small className="text-body-secondary d-block">
                  {p.fecha} - {p.hora} | {p.sede}
                </small>
                <span className="badge bg-primary mt-1 me-1">{p.fase}</span>
                <span className="badge bg-success mt-1">{formatearPesos(p.precio)}</span>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => confirm('¿Eliminar partido?') && onEliminar(p.id)}
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}