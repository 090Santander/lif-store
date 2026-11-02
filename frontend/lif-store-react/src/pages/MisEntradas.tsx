import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import { useAuth } from '../context/AuthContext'
import type { OrdenEntrada } from '../data/datosLIF'
import { apiGet, mensajeApi } from '../api/client'
import { formatearPesos } from '../utils/formato'

const claseEstado: Record<OrdenEntrada['estado'], string> = {
  PENDIENTE_PAGO: 'text-bg-warning',
  PAGADA: 'text-bg-success',
  CANCELADA: 'text-bg-secondary',
}

function fechaOrden(fecha: string): string {
  const valor = new Date(fecha)
  return Number.isNaN(valor.getTime()) ? fecha : valor.toLocaleString('es-CL')
}

export default function MisEntradas() {
  const { usuario, cargando: authCargando } = useAuth()
  const [ordenes, setOrdenes] = useState<OrdenEntrada[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!usuario) return

    let activo = true
    apiGet<OrdenEntrada[]>('/entradas/mias')
      .then((respuesta) => {
        if (activo) {
          setOrdenes(respuesta)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (activo) setError(mensajeApi(e))
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => { activo = false }
  }, [usuario])

  return (
    <>
      <PageHero etiqueta="Boletería" titulo="Mis órdenes" subtitulo="Consulta el estado de tus órdenes de entradas" />
      <section className="container py-5">
        {authCargando ? (
          <p className="text-center text-body-secondary" role="status">Verificando sesión…</p>
        ) : !usuario ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
            <h2 className="h5 fw-bold">Inicia sesión para consultar tus órdenes</h2>
            <Link to="/login" className="btn btn-success rounded-pill fw-bold px-4 mx-auto">Ingresar</Link>
          </div>
        ) : (
          <>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {cargando ? (
              <p className="text-center text-body-secondary" role="status">Cargando órdenes…</p>
            ) : ordenes.length === 0 ? (
              <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                <h2 className="h5 fw-bold">Aún no tienes órdenes</h2>
                <p className="text-body-secondary">Cuando crees una orden de entradas, aparecerá aquí.</p>
                <Link to="/entradas" className="btn btn-success rounded-pill fw-bold px-4 mx-auto">Ver partidos</Link>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {ordenes.map((orden) => (
                  <article className="card border-0 shadow-sm rounded-4" key={orden.id}>
                    <div className="card-body p-4">
                      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                        <div>
                          <h2 className="h5 fw-bold mb-1">Orden #{orden.id}</h2>
                          <p className="small text-body-secondary mb-0">Creada {fechaOrden(orden.creadoEn)}</p>
                        </div>
                        <span className={`badge rounded-pill ${claseEstado[orden.estado] ?? 'text-bg-secondary'}`}>
                          {orden.estado.replaceAll('_', ' ')}
                        </span>
                      </div>
                      <ul className="list-group list-group-flush mb-3">
                        {orden.entradas.map((entrada) => (
                          <li className="list-group-item px-0" key={`${orden.id}-${entrada.partidoId}`}>
                            <div className="d-flex justify-content-between gap-3">
                              <span>{entrada.encuentro} <span className="text-body-secondary">× {entrada.cantidad}</span></span>
                              <span className="fw-semibold text-nowrap">{formatearPesos(Number(entrada.subtotal))}</span>
                            </div>
                            <small className="text-body-secondary">{entrada.fechaPartido} · {entrada.sede}</small>
                          </li>
                        ))}
                      </ul>
                      <div className="d-flex justify-content-between small text-body-secondary">
                        <span>Cargo por servicio</span><span>{formatearPesos(Number(orden.cargoServicio))}</span>
                      </div>
                      <div className="d-flex justify-content-between mt-2 fw-bold">
                        <span>Total</span><span className="text-success">{formatearPesos(Number(orden.total))}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
