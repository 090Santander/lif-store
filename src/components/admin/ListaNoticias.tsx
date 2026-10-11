import type { Noticia } from '../../data/datosLIF'

interface ListaNoticiasProps {
  titulo: string
  noticias: Noticia[]
  onEliminar: (id: number) => void
}

export default function ListaNoticias({ titulo, noticias, onEliminar }: ListaNoticiasProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <h2 className="fs-5 fw-bold mb-3">{titulo}</h2>
      <ul className="list-group list-group-flush">
        {noticias.length === 0 ? (
          <li className="list-group-item text-body-secondary">No hay noticias registradas.</li>
        ) : (
          noticias.map((n) => (
            <li key={n.id} className="list-group-item d-flex justify-content-between align-items-start gap-2 py-3">
              <div className="flex-grow-1">
                <div className="fw-bold fs-6">{n.titulo}</div>
                <span className="badge bg-success me-1">{n.categoria}</span>
                <small className="text-body-secondary">{n.fecha}</small>
                <p className="mb-0 text-body-secondary small mt-1">{n.resumen}</p>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => confirm('¿Eliminar noticia?') && onEliminar(n.id)}
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