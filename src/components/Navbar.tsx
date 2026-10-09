import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import logo from '../assets/LOGO.png'
import { DatosLIF, type Usuario } from '../data/datosLIF'

const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/partidos', texto: 'Partidos' },
  { to: '/posiciones', texto: 'Posiciones' },
  { to: '/noticias', texto: 'Noticias' },
  { to: '/complejos', texto: 'Complejos' },
  { to: '/entradas', texto: 'Entradas' },
  { to: '/actas', texto: 'Actas' },
  { to: '/jugadores', texto: 'Jugadores' },
  { to: '/contacto', texto: 'Contacto' },
  { to: '/solicitud', texto: 'Solicitud' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<Usuario | null>(() => DatosLIF.getUsuario())
  const [tema, setTema] = useState<'light' | 'dark'>(() => (localStorage.getItem('lif_tema') === 'dark' ? 'dark' : 'light'),)
  const cantidadCarrito = 0 // provisorio: lo conectamos al migrar carrito.js

  useEffect(() => {
  document.documentElement.setAttribute('data-bs-theme', tema)
  localStorage.setItem('lif_tema', tema)
}, [tema])

  const cerrarSesion = () => {
    DatosLIF.cerrarSesion()
    setUsuario(null)
    alert('Has cerrado sesión correctamente.')
    navigate('/')
  }

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-xl navbar-dark bg-dark-green shadow-sm py-2">
        <div className="container-fluid px-lg-4">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="LIF" className="logo-header" />
            <span className="fw-black fs-4 text-white">LIF</span>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav mx-auto gap-xl-1">
              {enlaces.map((e) => (
                <li className="nav-item" key={e.to}>
                  <NavLink className="nav-link" to={e.to} end={e.to === '/'}>
                    {e.texto}
                  </NavLink>
                </li>
              ))}
              {usuario?.rol === 'admin' && (
                <li className="nav-item">
                  <NavLink className="nav-link text-warning fw-bold" to="/admin">
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center gap-2 mt-3 mt-xl-0 flex-wrap">
              {usuario ? (
                <>
                  <Link to="/perfil" className="btn btn-sm btn-success rounded-pill px-3">
                    👤 Mi Perfil
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger rounded-pill px-3"
                    onClick={cerrarSesion}
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link to="/registro" className="btn btn-sm btn-outline-warning rounded-pill px-3">
                    Registrarse
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-sm btn-light text-success fw-bold rounded-pill px-3 shadow-sm"
                  >
                    Ingresar
                  </Link>
                </>
              )}

              <Link to="/carrito" className="btn btn-sm btn-warning rounded-pill px-3 fw-bold text-dark">
                🎟️ Tickets <span className="badge bg-danger ms-1">{cantidadCarrito}</span>
              </Link>

              <button
                type="button"
                className="btn btn-sm btn-dark border border-secondary rounded-circle ms-2"
                style={{ width: 35, height: 35 }}
                onClick={() => setTema(tema === 'dark' ? 'light' : 'dark')}
              >
                {tema === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}