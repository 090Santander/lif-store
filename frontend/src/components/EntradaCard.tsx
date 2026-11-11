import type { Partido } from '../data/datosLIF'
import { precioDe } from '../utils/carrito'
import { formatearPesos } from '../utils/formato'

interface EntradaCardProps {
  partido: Partido
  onComprar: (partido: Partido) => void
}

export default function EntradaCard({ partido, onComprar }: EntradaCardProps) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm border-0 rounded-4">
        <div className="card-body p-4 d-flex flex-column justify-content-between">
          <div>
            <h5 className="fw-bold mb-1 text-body">
              {partido.equipoLocal} <span className="text-body-secondary small">vs</span> {partido.equipoVisitante}
            </h5>
            <p className="text-body-secondary mb-2 small">
              📅 {partido.fecha}
              {partido.hora && ` - ⏰ ${partido.hora}`}
              {partido.sede && ` | 📍 ${partido.sede}`}
            </p>
            <span className="badge bg-success mb-3">{partido.fase || 'Oficial'}</span>
          </div>
          <div className="pt-3 border-top d-flex justify-content-between align-items-center">
            <h4 className="fw-bold text-success mb-0">{formatearPesos(precioDe(partido))}</h4>
            <button
              type="button"
              className="btn btn-warning fw-bold rounded-pill px-3 text-dark"
              onClick={() => onComprar(partido)}
            >
              🎟️ Comprar Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}