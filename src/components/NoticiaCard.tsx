import type { Noticia } from '../data/datosLIF'
import { resumirNoticia } from '../utils/noticias'

export default function NoticiaCard({ noticia }: { noticia: Noticia }) {
  const { titulo, cuerpo, categoria, fecha } = resumirNoticia(noticia)

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-4 card-noticia d-flex flex-column overflow-hidden">
        <div className="card-body p-4 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <span className="badge bg-dark text-warning rounded-pill px-3 py-2 border border-warning shadow">
              {categoria}
            </span>
            <small className="text-success fw-bold">
              <span aria-hidden="true">📅</span> {fecha}
            </small>
          </div>
          <h3 className="h5 card-title fw-bold text-body mb-3 lh-base">{titulo}</h3>
          <p className="card-text text-body-secondary small flex-grow-1">{cuerpo}</p>
          <button
            type="button"
            className="btn btn-outline-success rounded-pill btn-sm fw-bold align-self-start mt-3 px-4"
          >
            Leer más
          </button>
        </div>
      </div>
    </div>
  )
}