import type { OrdenEntrada } from '../../data/datosLIF'
import { formatearPesos } from '../../utils/formato'

interface PanelOrdenesProps {
  ordenes: OrdenEntrada[]
}

export default function PanelOrdenes({ ordenes }: PanelOrdenesProps) {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <h2 className="fs-5 fw-bold mb-3">Órdenes de entradas</h2>
      {ordenes.length === 0 ? (
        <p className="text-body-secondary mb-0">Todavía no hay órdenes registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr><th>Orden</th><th>Solicitante</th><th>Entradas</th><th>Estado</th><th className="text-end">Total</th></tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td><span className="fw-bold">#{orden.id}</span><br /><small className="text-body-secondary">{new Date(orden.creadoEn).toLocaleString('es-CL')}</small></td>
                  <td>{orden.nombreSolicitante}<br /><small className="text-body-secondary">{orden.solicitante}</small></td>
                  <td>{orden.entradas.reduce((cantidad, entrada) => cantidad + entrada.cantidad, 0)}</td>
                  <td><span className="badge text-bg-secondary">{orden.estado.replaceAll('_', ' ')}</span></td>
                  <td className="text-end fw-bold">{formatearPesos(Number(orden.total))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
