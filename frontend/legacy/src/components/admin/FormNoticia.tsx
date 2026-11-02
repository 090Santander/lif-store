import { useState, type FormEvent, type ReactNode } from 'react'
import Campo from '../Campo'
import CampoSelect from '../CampoSelect'
import type { Noticia } from '../../data/datosLIF'

interface FormNoticiaProps {
  prefijo: string // para los id de los campos: "n" o "np"
  titulo: ReactNode
  categorias: string[]
  placeholders: { titulo: string; fecha: string; resumen: string }
  filas?: number
  textoBoton: string
  claseBoton?: string
  onAgregar: (noticia: Omit<Noticia, 'id'>) => void
}

export default function FormNoticia({
  prefijo, titulo, categorias, placeholders, filas = 3,
  textoBoton, claseBoton = 'btn-success', onAgregar,
}: FormNoticiaProps) {
  const vacio = { titulo: '', categoria: categorias[0], fecha: '', resumen: '' }
  const [form, setForm] = useState(vacio)

  const cambiar = (campo: keyof typeof vacio) => (valor: string) =>
    setForm({ ...form, [campo]: valor })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    onAgregar({
      titulo: form.titulo.trim(),
      categoria: form.categoria,
      fecha: form.fecha.trim(),
      resumen: form.resumen.trim(),
    })
    setForm(vacio)
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
      <h2 className="fs-5 fw-bold mb-3">{titulo}</h2>
      <form onSubmit={enviar}>
        <Campo
          id={`${prefijo}-titulo`}
          etiqueta="Título de la Noticia"
          placeholder={placeholders.titulo}
          value={form.titulo}
          onChange={cambiar('titulo')}
        />
        <div className="row g-2">
          <div className="col-6">
            <CampoSelect
              id={`${prefijo}-categoria`}
              etiqueta="Categoría"
              opciones={categorias}
              value={form.categoria}
              onChange={cambiar('categoria')}
            />
          </div>
          <div className="col-6">
            <Campo
              id={`${prefijo}-fecha`}
              etiqueta="Fecha / Tiempo"
              placeholder={placeholders.fecha}
              value={form.fecha}
              onChange={cambiar('fecha')}
            />
          </div>
        </div>
        <Campo
          id={`${prefijo}-resumen`}
          etiqueta="Resumen / Contenido"
          filas={filas}
          placeholder={placeholders.resumen}
          value={form.resumen}
          onChange={cambiar('resumen')}
        />
        <button type="submit" className={`btn ${claseBoton} w-100 rounded-pill fw-bold mt-2`}>
          {textoBoton}
        </button>
      </form>
    </div>
  )
}