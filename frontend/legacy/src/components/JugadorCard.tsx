import type { Jugador } from '../data/datosLIF'
import { obtenerIniciales } from '../utils/iniciales'

interface JugadorCardProps {
  jugador: Jugador
}

export default function JugadorCard({ jugador }: JugadorCardProps) {
  return (
    <div className="col-md-6 col-xl-4">
      <div className="card border-0 shadow-sm h-100 rounded-4">
        <div className="card-body p-4 d-flex align-items-center gap-3">
          <div
            className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4"
            style={{ width: 60, height: 60, minWidth: 60 }}
          >
            {obtenerIniciales(jugador.nombre)}
          </div>
          <div>
            <span className="badge bg-success mb-1">{jugador.posicion ?? 'Jugador'}</span>
            <h5 className="fw-bold mb-0 text-body">{jugador.nombre}</h5>
            <small className="text-body-secondary">
              {jugador.equipo ?? 'LIF'} - Dorsal #{jugador.dorsal ?? 0}
            </small>
          </div>
        </div>
        <div className="card-footer bg-body-tertiary border-0 d-flex justify-content-around text-center py-3 rounded-bottom-4">
          <div>
            <div className="fw-bold fs-5 text-body">{jugador.pj ?? 0}</div>
            <small className="text-body-secondary">PJ</small>
          </div>
          <div>
            <div className="fw-bold fs-5 text-success">{jugador.goles ?? 0}</div>
            <small className="text-body-secondary">Goles</small>
          </div>
          <div>
            <div className="fw-bold fs-5 text-warning">{jugador.ta ?? 0}</div>
            <small className="text-body-secondary">TA</small>
          </div>
          <div>
            <div className="fw-bold fs-5 text-danger">{jugador.tr ?? 0}</div>
            <small className="text-body-secondary">TR</small>
          </div>
        </div>
      </div>
    </div>
  )
}