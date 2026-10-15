import { useState, type FormEvent } from 'react'
import Campo from '../Campo'
import type { Partido } from '../../data/datosLIF'

interface FormPartidoProps {
  onAgregar: (partido: Omit<Partido, 'id'>) => void
}

const vacio = { local: '', visitante: '', fecha: '', hora: '', sede: '', fase: '', precio: '', desc: '' }

export default function FormPartido({ onAgregar }: FormPartidoProps) {
  const [form, setForm] = useState(vacio)

  const cambiar = (campo: keyof typeof vacio) => (valor: string) =>
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
    setForm(vacio)
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <h2 className="fs-5 fw-bold mb-3">Agregar Nuevo Partido / Entrada</h2>
      <form onSubmit={enviar}>
        <Campo id="p-local" etiqueta="Equipo Local" placeholder="Ej: Cracks FC" value={form.local} onChange={cambiar('local')} />
        <Campo id="p-visitante" etiqueta="Equipo Visitante" placeholder="Ej: Zánganos FC" value={form.visitante} onChange={cambiar('visitante')} />
        <div className="row g-2">
          <div className="col-6">
            <Campo id="p-fecha" etiqueta="Fecha / Texto" placeholder="SÁBADO 12 SEPT" value={form.fecha} onChange={cambiar('fecha')} />
          </div>
          <div className="col-6">
            <Campo id="p-hora" etiqueta="Hora" placeholder="16:00 hrs" value={form.hora} onChange={cambiar('hora')} />
          </div>
        </div>
        <div className="row g-2">
          <div className="col-6">
            <Campo id="p-sede" etiqueta="Sede" placeholder="Sede Principal" value={form.sede} onChange={cambiar('sede')} />
          </div>
          <div className="col-6">
            <Campo id="p-fase" etiqueta="Fase / Categoría" placeholder="Gran Final" value={form.fase} onChange={cambiar('fase')} />
          </div>
        </div>
        <Campo id="p-precio" etiqueta="Precio Entrada ($)" type="number" min={0} placeholder="5000" value={form.precio} onChange={cambiar('precio')} />
        <Campo
          id="p-desc"
          etiqueta="Descripción / Detalles"
          filas={2}
          required={false}
          placeholder="Detalles del aforo o requisitos..."
          value={form.desc}
          onChange={cambiar('desc')}
        />
        <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold mt-2">
          Publicar Partido y Tickets
        </button>
      </form>
    </div>
  )
}