import { useState, type FormEvent } from 'react'
import Campo from '../Campo'
import type { Noticia } from '../../data/datosLIF'

interface PanelNoticiasProps {
  noticias: Noticia[]
  onAgregar: (noticia: Omit<Noticia, 'id'>) => void
  onEliminar: (id: number) => void
}

const formVacio = { titulo: '', categoria: 'Oficial', fecha: '', resumen: '' }

export default function PanelNoticias({ noticias, onAgregar, onEliminar }: PanelNoticiasProps) {
  const [form, setForm] = useState(formVacio)

  const cambiar = (campo: keyof typeof formVacio) => (valor: string) =>
    setForm({ ...form, [campo]: valor })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    onAgregar({
      titulo: form.titulo.trim(),
      categoria: form.categoria,
      fecha: form.fecha.trim(),
      resumen: form.resumen.trim(),
    })
    setForm(formVacio)
  }

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <form className="card border-0 shadow-sm rounded-4 p-4" onSubmit={enviar}>
          <h2 className="h6 fw-bold mb-3">📰 Nueva noticia</h2>
          <Campo id="n-titulo" etiqueta="Título" value={form.titulo} onChange={cambiar('titulo')} />
          <div className="mb-3">
            <label htmlFor="n-categoria" className="form-label fw-semibold small">Categoría</label>
            <select
              id="n-categoria"
              className="form-select"
              value={form.categoria}
              onChange={(e) => cambiar('categoria')(e.target.value)}
            >
              <option>Oficial</option>
              <option>Crónica</option>
              <option>Comunicado</option>
            </select>
          </div>
          <Campo id="n-fecha" etiqueta="Fecha" type="date" value={form.fecha} onChange={cambiar('fecha')} />
          <div className="mb-3">
            <label htmlFor="n-resumen" className="form-label fw-semibold small">Resumen</label>
            <textarea
              id="n-resumen"
              className="form-control"
              rows={3}
              required
              value={form.resumen}
              onChange={(e) => cambiar('resumen')(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success fw-bold rounded-pill">Publicar</button>
        </form>
      </div>

      <div className="col-lg-7">
        <ul className="list-group shadow-sm rounded-4 overflow-hidden">
          {noticias.length === 0 ? (
            <li className="list-group-item text-body-secondary">No hay noticias registradas.</li>
          ) : (
            noticias.map((n) => (
              <li
                key={n.id}
                className="list-group-item d-flex justify-content-between align-items-start gap-2 py-3"
              >
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
    </div>
  )
}