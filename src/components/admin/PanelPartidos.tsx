import { useState, type FormEvent } from 'react'
import Campo from '../Campo'
import type { Partido } from '../../data/datosLIF'

interface PanelPartidosProps {
  partidos: Partido[]
  onAgregar: (partido: Omit<Partido, 'id'>) => void
  onEliminar: (id: number) => void
}

const formVacio = {
  local: '', visitante: '', fecha: '', hora: '', sede: '', fase: '', precio: '', desc: '',
}

export default function PanelPartidos({ partidos, onAgregar, onEliminar }: PanelPartidosProps) {
  const [form, setForm] = useState(formVacio)

  const cambiar = (campo: keyof typeof formVacio) => (valor: string) =>
    setForm({ ...form, [campo]: valor })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    onAgregar({
      equipoLocal: form.local.trim(),
      equipoVisitante: form.visitante.trim(),
      fecha: form.fecha.trim(),
      hora: form.hora.trim(),
      sede: form.sede.trim(),
      fase: form.fase.trim(),
      precio: Number(form.precio),
      descripcion: form.desc.trim(),
    })
    setForm(formVacio)
  }

  return (
    <div className="row g-4">
      <div className="col-lg-5">
        <form className="card border-0 shadow-sm rounded-4 p-4" onSubmit={enviar}>
          <h2 className="h6 fw-bold mb-3">⚽ Nuevo partido</h2>
          <Campo id="p-local" etiqueta="Equipo local" value={form.local} onChange={cambiar('local')} />
          <Campo id="p-visitante" etiqueta="Equipo visitante" value={form.visitante} onChange={cambiar('visitante')} />
          <div className="row">
            <div className="col-6">
              <Campo id="p-fecha" etiqueta="Fecha" type="date" value={form.fecha} onChange={cambiar('fecha')} />
            </div>
            <div className="col-6">
              <Campo id="p-hora" etiqueta="Hora" type="time" value={form.hora} onChange={cambiar('hora')} />
            </div>
          </div>
          <Campo id="p-sede" etiqueta="Sede" value={form.sede} onChange={cambiar('sede')} />
          <Campo id="p-fase" etiqueta="Fase" value={form.fase} onChange={cambiar('fase')} />
          <Campo id="p-precio" etiqueta="Precio ($)" type="number" min={0} value={form.precio} onChange={cambiar('precio')} />
          <Campo id="p-desc" etiqueta="Descripción" required={false} value={form.desc} onChange={cambiar('desc')} />
          <button type="submit" className="btn btn-success fw-bold rounded-pill">Programar</button>
        </form>
      </div>

      <div className="col-lg-7">
        <ul className="list-group shadow-sm rounded-4 overflow-hidden">
          {partidos.length === 0 ? (
            <li className="list-group-item text-body-secondary">No hay partidos registrados.</li>
          ) : (
            partidos.map((p) => (
              <li
                key={p.id}
                className="list-group-item d-flex justify-content-between align-items-center gap-2 py-3"
              >
                <div>
                  <div className="fw-bold">{p.equipoLocal} vs {p.equipoVisitante}</div>
                  <small className="text-body-secondary d-block">
                    {p.fecha} - {p.hora} | {p.sede}
                  </small>
                  <span className="badge bg-primary mt-1 me-1">{p.fase}</span>
                  <span className="badge bg-success mt-1">${p.precio.toLocaleString('es-CL')}</span>
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
    </div>
  )
}