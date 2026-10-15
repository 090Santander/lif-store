import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
// @ts-ignore
import logo from "../assets/LOGO.png";


import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'

interface Enlace {
  to: string
  texto: string
}

const enlaces: Enlace[] = [
  { to: '/', texto: 'Inicio' },
  { to: '/partidos', texto: 'Partidos' },
  { to: '/posiciones', texto: 'Posiciones' },
  { to: '/noticias', texto: 'Noticias' },
  { to: '/complejos', texto: 'Complejos' },
  { to: '/entradas', texto: 'Entradas' },
  { to: '/actas', texto: 'Actas' },
  { to: '/jugadores', texto: 'Jugadores' },
  { to: '/contacto', texto: 'Contacto' },
  { to: '/solicitud', texto: 'Solicitud' }
]

export default function Navbar() {
  const navigate = useNavigate()
  const { usuario, esAdmin, cerrarSesion } = useAuth()
  const [tema, setTema] = useState<'light' | 'dark'>(() =>
    localStorage.getItem('lif_tema') === 'dark' ? 'dark' : 'light'
  )

  const contextCarrito = useCarrito() as any
  const cantidad =
    contextCarrito.cantidad ??
    (Array.isArray(contextCarrito.carrito)
      ? contextCarrito.carrito.reduce(
          (acc: number, item: any) => acc + (item.cantidad || 1),
          0
        )
      : 0)

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', tema)
    localStorage.setItem('lif_tema', tema)
  }, [tema])

  const salir = () => {
    cerrarSesion()
    alert('Has cerrado sesión correctamente.')
    navigate('/')
  }

  return (
    <header className="sticky-top" style={{ zIndex: 1030 }}>
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
            data-bs-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-xl-0">
              {enlaces.map((e) => (
                <li className="nav-item" key={e.to}>
                  <NavLink
                    to={e.to}
                    className={({ isActive }) =>
                      `nav-link fw-semibold px-2 ${isActive ? 'active text-warning' : ''}`
                    }
                  >
                    {e.texto}
                  </NavLink>
                </li>
              ))}
              {esAdmin && (
                <li className="nav-item">
                  <NavLink to="/admin" className="nav-link fw-bold text-danger">
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center gap-3">
              <Link to="/carrito" className="btn btn-outline-light position-relative">
                🛒
                {cantidad > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cantidad}
                  </span>
                )}
              </Link>

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setTema(tema === 'light' ? 'dark' : 'light')}
              >
                {tema === 'light' ? '🌙' : '☀️'}
              </button>

              {usuario ? (
                <div className="d-flex align-items-center gap-2">
                  <Link to="/perfil" className="btn btn-sm btn-light fw-bold">
                    {usuario.nombre || usuario.correo}
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={salir}>
                    Salir
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-sm btn-warning fw-bold">
                  Ingresar
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}