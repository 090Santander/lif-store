import type { Noticia } from '../data/datosLIF'
import { resumirNoticia } from '../utils/noticias'

export default function NoticiaDestacada({ noticia }: { noticia: Noticia }) {
  const { titulo, cuerpo, categoria, fecha } = resumirNoticia(noticia)

  return (
    <div className="card border-0 shadow rounded-4 card-noticia overflow-hidden p-2 p-lg-3">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <span className="badge bg-success text-white rounded-pill px-3 py-2 fw-bold shadow-sm">
            {categoria}
          </span>
          <small className="text-success fw-bold">
            <span aria-hidden="true">📅</span> {fecha}
          </small>
        </div>
        <h2 className="card-title fw-black display-6 mb-3 text-body lh-sm">{titulo}</h2>
        <p className="card-text text-body-secondary fs-5 mb-4">{cuerpo}</p>
        <button type="button" className="btn btn-warning rounded-pill px-4 fw-bold text-dark shadow-sm">
          Leer artículo completo →
        </button>
      </div>
    </div>
  )
}