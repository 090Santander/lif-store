import { useState, type FormEvent } from 'react'
import Campo from '../Campo'
import type { Jugador } from '../../data/datosLIF'

interface PanelJugadoresProps {
  jugadores: Jugador[]
  onAgregar: (jugador: Omit<Jugador, 'id'>) => void
  onEliminar: (id: number) => void
  onEditarStats: (jugador: Jugador) => void
}

const formVacio = { nombre: '', equipo: '', posicion: 'Delantero', dorsal: '' }

export default function PanelJugadores({
  jugadores,
  onAgregar,
  onEliminar,
  onEditarStats,
}: PanelJugadoresProps) {
  const [form, setForm] = useState(formVacio)

  const cambiar = (campo: keyof typeof formVacio) => (valor: string) =>
    setForm({ ...form, [campo]: valor })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    onAgregar({
      nombre: form.nombre.trim(),
      equipo: form.equipo.trim(),
      posicion: form.posicion,
      dorsal: form.dorsal,
    })
    setForm(formVacio)
  }

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <form className="card border-0 shadow-sm rounded-4 p-4" onSubmit={enviar}>
          <h2 className="h6 fw-bold mb-3">👤 Nuevo jugador</h2>
          <Campo id="j-nombre" etiqueta="Nombre" value={form.nombre} onChange={cambiar('nombre')} />
          <Campo id="j-equipo" etiqueta="Equipo" value={form.equipo} onChange={cambiar('equipo')} />
          <div className="mb-3">
            <label htmlFor="j-posicion" className="form-label fw-semibold small">Posición</label>
            <select
              id="j-posicion"
              className="form-select"
              value={form.posicion}
              onChange={(e) => cambiar('posicion')(e.target.value)}
            >
              <option>Portero</option>
              <option>Defensa</option>
              <option>Mediocampista</option>
              <option>Delantero</option>
            </select>
          </div>
          <Campo id="j-dorsal" etiqueta="Dorsal" type="number" min={0} value={form.dorsal} onChange={cambiar('dorsal')} />
          <button type="submit" className="btn btn-success fw-bold rounded-pill">Registrar</button>
        </form>
      </div>

      <div className="col-lg-8">
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table align-middle m-0">
              <thead className="extra-small text-body-secondary text-uppercase">
                <tr>
                  <th scope="col">Dorsal</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Equipo</th>
                  <th scope="col">Posición</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {jugadores.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-body-secondary py-3">
                      No hay jugadores registrados.
                    </td>
                  </tr>
                ) : (
                  jugadores.map((j) => (
                    <tr key={j.id}>
                      <th scope="row">#{j.dorsal}</th>
                      <td className="fw-bold">{j.nombre}</td>
                      <td>{j.equipo}</td>
                      <td><span className="badge bg-secondary">{j.posicion}</span></td>
                      <td className="text-nowrap">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary rounded-pill fw-bold me-1"
                          onClick={() => onEditarStats(j)}
                        >
                          📊 Stats
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger rounded-pill"
                          onClick={() => confirm('¿Eliminar jugador?') && onEliminar(j.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}