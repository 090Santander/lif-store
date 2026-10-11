import { useState, type FormEvent } from 'react'
import Campo from '../Campo'
import CampoSelect from '../CampoSelect'
import type { Jugador } from '../../data/datosLIF'

interface FormJugadorProps {
  onAgregar: (jugador: Omit<Jugador, 'id'>) => void
}

const posiciones = ['Portero', 'Defensa', 'Mediocampista', 'Delantero']
const vacio = { nombre: '', equipo: '', posicion: posiciones[0], dorsal: '' }

export default function FormJugador({ onAgregar }: FormJugadorProps) {
  const [form, setForm] = useState(vacio)

  const cambiar = (campo: keyof typeof vacio) => (valor: string) =>
    setForm({ ...form, [campo]: valor })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    onAgregar({
      nombre: form.nombre.trim(),
      equipo: form.equipo.trim(),
      posicion: form.posicion,
      dorsal: form.dorsal,
    })
    setForm(vacio)
  }

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <h2 className="fs-5 fw-bold mb-3">Registrar Nuevo Jugador</h2>
      <form onSubmit={enviar}>
        <Campo id="j-nombre" etiqueta="Nombre Completo" placeholder="Ej: Juan Román" value={form.nombre} onChange={cambiar('nombre')} />
        <Campo id="j-equipo" etiqueta="Equipo" placeholder="Ej: Cracks FC" value={form.equipo} onChange={cambiar('equipo')} />
        <div className="row g-2 mb-1">
          <div className="col-6">
            <CampoSelect id="j-posicion" etiqueta="Posición" opciones={posiciones} value={form.posicion} onChange={cambiar('posicion')} />
          </div>
          <div className="col-6">
            <Campo id="j-dorsal" etiqueta="Dorsal (#)" type="number" min={1} max={99} placeholder="10" value={form.dorsal} onChange={cambiar('dorsal')} />
          </div>
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold mt-2">
          Guardar Jugador
        </button>
      </form>
    </div>
  )
}