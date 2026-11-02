import { useState } from 'react'
import { Link } from 'react-router'
import ModalPago from '../components/ModalPago'
import { useCarrito, type ItemCarrito } from '../context/CarritoContext'
import { calcularResumen } from '../utils/carrito'
import { formatearPesos } from '../utils/formato'
import PageHero from '../components/PageHero'
import { useAuth } from '../context/AuthContext'
import { apiPost, mensajeApi } from '../api/client'

interface OrdenCreada {
  id: number
  estado: string
  total: number
  cargoServicio: number
}

export default function Carrito() {
  const { carrito: tickets, eliminarDelCarrito, vaciarCarrito } = useCarrito()
  const { usuario, cargando: authCargando } = useAuth()

  const [mostrarPago, setMostrarPago] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ordenCreada, setOrdenCreada] = useState<OrdenCreada | null>(null)
  const { subtotal, cargo, total } = calcularResumen(tickets)

  const crearOrden = async () => {
    if (!usuario || tickets.length === 0 || enviando) return
    setError(null)
    setOrdenCreada(null)
    setEnviando(true)
    try {
      const orden = await apiPost<OrdenCreada>('/entradas/compras', {
        entradas: tickets.map((ticket: ItemCarrito) => ({ partidoId: ticket.partidoId, cantidad: ticket.cantidad })),
      })
      vaciarCarrito()
      setMostrarPago(false)
      setOrdenCreada(orden)
    } catch (e) {
      setError(mensajeApi(e))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <PageHero
        etiqueta="Boletería"
        titulo="Tu Carrito"
        subtitulo="Revisa tus entradas antes de crear la orden"
      />
      <section className="container py-5">
        {ordenCreada && (
          <div className="alert alert-success" role="status">
            Orden #{ordenCreada.id} creada por {formatearPesos(ordenCreada.total)}. Estado: {ordenCreada.estado}. El pago está pendiente.
            {' '}<Link to="/mis-entradas" className="alert-link">Ver mis órdenes</Link>
          </div>
        )}
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
                    const esVip = t.localidad?.includes('VIP')
                    return (
                      <div className="list-group-item p-4" key={t.id}>
                        <div className="row align-items-center g-3">
                          <div className="col-auto">
                            <span className={`display-6 ${esVip ? 'text-warning' : 'text-success'} opacity-75`}>
                              {esVip ? '🎫' : '🎟️'}
                            </span>
                          </div>
                          <div className="col">
                            <h5 className="mb-1 fw-bold text-body">{t.encuentro}</h5>
                            <p className="mb-0 text-body-secondary extra-small">
                              {t.localidad} • {t.fecha}
                            </p>
                          </div>
                          <div className="col-12 col-sm-auto d-flex align-items-center gap-3">
                            <span className="fw-bold text-body" style={{ width: 80, textAlign: 'right' }}>
                              {t.cantidad > 1 && <span className="text-body-secondary small">×{t.cantidad} </span>}
                              {formatearPesos((t.precio || 0) * t.cantidad)}
                            </span>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger border-0"
                              aria-label="Eliminar entrada"
                              onClick={() => eliminarDelCarrito(t.id)}
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
                  disabled={subtotal === 0 || !usuario || authCargando}
                  onClick={() => { setError(null); setMostrarPago(true) }}
                >
                  {authCargando ? 'Verificando sesión…' : usuario ? 'Crear orden' : 'Inicia sesión para continuar'}
                </button>
              </div>

              {!authCargando && !usuario && <p className="small text-center text-body-secondary mt-3 mb-0">Necesitas <Link to="/login">iniciar sesión</Link> para asociar esta orden a tu cuenta.</p>}
              <p className="small text-center text-body-secondary mt-3 mb-0">El pago en línea todavía no está disponible.</p>
            </div>
          </div>
        </div>

        {mostrarPago && (
          <ModalPago onConfirmar={() => void crearOrden()} onCerrar={() => setMostrarPago(false)} enviando={enviando} />
        )}
      </section>
    </>
  )
}
