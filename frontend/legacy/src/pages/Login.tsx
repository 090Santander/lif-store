import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { crearSesion, validarCredenciales } from '../utils/auth'

export default function Login() {
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')

  const enviar = (e: FormEvent) => {
    e.preventDefault()

    if (!validarCredenciales(correo, clave)) {
      alert('Por favor, ingresa credenciales válidas.')
      return
    }

    const usuario = crearSesion(correo, clave)
    iniciarSesion(usuario)

    if (usuario.rol === 'admin') {
      alert('🛡️ ¡Bienvenido, Administrador!')
      navigate('/admin')
    } else {
      alert('👋 ¡Bienvenido de nuevo!')
      navigate('/perfil')
    }
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="col-12 col-md-8 col-lg-5 col-xl-4">
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="bg-dark-green text-white text-center py-4 px-4 border-bottom border-success border-4">
            <h1 className="h3 fw-black mb-1">¡Bienvenido!</h1>
            <p className="small text-white-50 mb-0">Ingresa a tu portal de jugador o hincha</p>
          </div>

          <div className="card-body p-4 p-md-5">
            <form onSubmit={enviar}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-3 focus-success"
                  id="inputEmail"
                  placeholder="nombre@ejemplo.com"
                  required
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <label htmlFor="inputEmail">Correo electrónico</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-3 focus-success"
                  id="inputPassword"
                  placeholder="Contraseña"
                  required
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                />
                <label htmlFor="inputPassword">Contraseña</label>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4 small">
                <div className="form-check">
                  <input className="form-check-input border-success" type="checkbox" id="checkRecordar" />
                  <label className="form-check-label text-body-secondary" htmlFor="checkRecordar">
                    Recordarme
                  </label>
                </div>
                <button type="button" className="btn btn-link p-0 small text-success text-decoration-none fw-bold">
                  ¿Olvidaste tu clave?
                </button>
              </div>

              <div className="d-grid mb-4">
                <button type="submit" className="btn btn-success btn-lg rounded-pill fw-bold shadow-sm">
                  Iniciar Sesión
                </button>
              </div>

              <div className="position-relative text-center mb-4">
                <hr className="text-body-secondary" />
                <span className="position-absolute top-50 start-50 translate-middle bg-body px-2 small text-body-secondary">
                  o ingresa con
                </span>
              </div>

              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <span className="fs-5">G</span> Google
                </button>
              </div>
            </form>
          </div>

          <div className="card-footer bg-body-tertiary text-center py-3 border-0">
            <p className="small text-body-secondary mb-0">
              ¿No tienes una cuenta?{' '}
              <Link to="/registro" className="text-success fw-bold text-decoration-none">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}