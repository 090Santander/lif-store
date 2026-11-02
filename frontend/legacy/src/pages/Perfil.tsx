import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function Perfil() {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const [saliendo, setSaliendo] = useState(false)


  if (!usuario) return saliendo ? null : <Navigate to="/login" replace />

  const salir = () => {
    setSaliendo(true)
    cerrarSesion()
    alert('Has cerrado sesión correctamente.')
    navigate('/')
  }

  const datos = [
    { etiqueta: 'Nombre Completo', valor: usuario.nombre, clase: 'text-body' },
    { etiqueta: 'Correo Electrónico', valor: usuario.correo, clase: 'text-body' },
    { etiqueta: 'Estado de Cuenta', valor: 'Activa', clase: 'text-success' },
    { etiqueta: 'Miembro desde', valor: 'Temporada 2026', clase: 'text-body' },
  ]

  return (
    <section className="container py-5">
      <div className="row justify-content-center g-4">
        <div className="col-lg-4 col-md-5">
          <div className="card border-0 shadow-sm rounded-4 p-4 text-center h-100 bg-body">
            <div
              className="bg-body-tertiary text-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{ width: 90, height: 90, fontSize: '2.5rem' }}
            >
              👤
            </div>

            <h5 className="fw-bold mb-1 text-body">{usuario.nombre}</h5>
            <p className="text-body-secondary small mb-4">{usuario.correo}</p>

            <div className="list-group list-group-flush text-start mb-5 gap-1">
              <Link
                to="/perfil"
                className="list-group-item list-group-item-action border-0 rounded-3 text-success fw-bold bg-success-subtle px-3 py-2"
              >
                Mis Datos
              </Link>
              <Link
                to="/entradas"
                className="list-group-item list-group-item-action border-0 rounded-3 text-secondary px-3 py-2"
              >
                Comprar Entradas
              </Link>
              <Link
                to="/solicitud"
                className="list-group-item list-group-item-action border-0 rounded-3 text-secondary px-3 py-2"
              >
                Solicitud de Equipo
              </Link>
            </div>

            <div className="mt-auto border-top pt-4">
              <button type="button" className="btn btn-outline-danger w-100 rounded-pill fw-medium" onClick={salir}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-7">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-body">
            <div className="card-body p-5">
              <h4 className="fw-bold mb-5 text-body border-bottom pb-3">Perfil de Usuario</h4>

              {datos.map((d, i) => (
                <div className={`row ${i < datos.length - 1 ? 'mb-4' : ''}`} key={d.etiqueta}>
                  <div className="col-sm-5 text-body-secondary small text-uppercase fw-bold letter-spacing-1">
                    {d.etiqueta}
                  </div>
                  <div className={`col-sm-7 fw-medium fs-6 ${d.clase}`}>{d.valor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}