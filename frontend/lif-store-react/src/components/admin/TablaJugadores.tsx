import type { Jugador } from '../../data/datosLIF'

interface TablaJugadoresProps {
  jugadores: Jugador[]
  onEliminar: (id: number) => void
  onEditarStats: (jugador: Jugador) => void
}

export default function TablaJugadores({ jugadores, onEliminar, onEditarStats }: TablaJugadoresProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <h2 className="fs-5 fw-bold mb-3">Plantel Registrado</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Jugador</th>
              <th scope="col">Equipo</th>
              <th scope="col">Posición</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-body-secondary">
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
  )
}