import { useState } from 'react'
import { Link } from 'react-router'
import ModalPago from '../components/ModalPago'
import { useCarrito } from '../context/CarritoContext'
import { calcularResumen } from '../utils/carrito'
import { formatearPesos } from '../utils/formato'

export default function Carrito() {
  const { tickets, eliminar, vaciar } = useCarrito()
  const [mostrarPago, setMostrarPago] = useState(false)
  const { subtotal, cargo, total } = calcularResumen(tickets)

  const pagar = (metodo: string) => {
    if (tickets.length === 0) {
      alert('Tu carrito está vacío.')
      return
    }
    alert(`🎉 ¡Pago vía ${metodo.toUpperCase()} exitoso! Tus e-Tickets han sido generados.`)
    setMostrarPago(false)
    vaciar()
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div className="card-header bg-body py-3 fw-bold border-bottom text-body">
              Entradas Seleccionadas
            </div>
            <div className="list-group list-group-flush">
              {tickets.length === 0 ? (
                <div className="p-4 text-center text-body-secondary">
                  No tienes entradas agregadas a tu carrito.
                </div>
              ) : (
                tickets.map((t) => {
                  const esVip = t.localidad.includes('VIP')
                  return (
                    <div className="list-group-item p-4" key={t.idUnico}>
                      <div className="row align-items-center g-3">
                        <div className="col-auto">
                          <span className={`display-6 ${esVip ? 'text-warning' : 'text-success'} opacity-75`}>
                            {esVip ? '🎫' : '🎟️'}
                          </span>
                        </div>
                        <div className="col">
                          <h5 className="mb-1 fw-bold text-body">{t.encuentro}</h5>
                          <p className="mb-0 text-body-secondary extra-small">
                            {t.localidad} - {t.fecha}
                          </p>
                        </div>
                        <div className="col-12 col-sm-auto d-flex align-items-center gap-3">
                          <span className="fw-bold text-body" style={{ width: 80, textAlign: 'right' }}>
                            {formatearPesos(t.precio)}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger border-0"
                            aria-label="Eliminar entrada"
                            onClick={() => eliminar(t.idUnico)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
          <Link to="/entradas" className="text-success fw-bold text-decoration-none">
            ← Seguir comprando
          </Link>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 sticky-lg-top" style={{ top: 100 }}>
            <h4 className="fw-bold h5 mb-4 text-body">Resumen de Orden</h4>

            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-body-secondary">Subtotal</span>
              <span className="fw-bold text-body">{formatearPesos(subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 small">
              <span className="text-body-secondary">Cargo por servicio (10%)</span>
              <span className="fw-bold text-body">{formatearPesos(cargo)}</span>
            </div>

            <hr className="border-secondary" />

            <div className="d-flex justify-content-between mb-4">
              <span className="fw-black fs-5 text-body">Total</span>
              <span className="fw-black fs-5 text-success">{formatearPesos(total)}</span>
            </div>

            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-warning fw-bold text-dark rounded-pill py-2 shadow-sm"
                disabled={subtotal === 0}
                onClick={() => setMostrarPago(true)}
              >
                Proceder al Pago
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="extra-small text-body-secondary mb-2">Medios de pago seguros</p>
              <div className="d-flex justify-content-center gap-2 opacity-50">
                <span className="fs-4">💳</span> <span className="fs-4">🏦</span> <span className="fs-4">📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mostrarPago && (
        <ModalPago total={total} onConfirmar={pagar} onCerrar={() => setMostrarPago(false)} />
      )}
    </div>
  )
}