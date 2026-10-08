import { Link } from 'react-router'

interface Acceso {
  ruta: string
  icono: string
  titulo: string
  destacado?: boolean
}

const accesos: Acceso[] = [
  { ruta: '/partidos', icono: '⚽', titulo: 'Partidos' },
  { ruta: '/posiciones', icono: '🏆', titulo: 'Posiciones' },
  { ruta: '/entradas', icono: '🎟️', titulo: 'Entradas', destacado: true },
  { ruta: '/noticias', icono: '📰', titulo: 'Noticias' },
  { ruta: '/complejos', icono: '🏟️', titulo: 'Complejos' },
  { ruta: '/actas', icono: '📋', titulo: 'Actas' },
]

export default function Home() {
  return (
    <>
      <section className="hero-green text-white py-5 text-center">
        <div className="container py-4">
          <span className="badge bg-light text-success fw-bold px-3 py-1 rounded-pill text-uppercase mb-3 shadow-sm">
            Temporada 2026
          </span>
          <h1 className="fw-black display-5 mb-3 text-shadow">Liga Independiente de Fútbol</h1>
          <p className="lead text-white-50 fs-6 mx-auto col-lg-6 mb-4">
            El campeonato amateur más grande. Revisa el fixture, la tabla de posiciones y compra tus entradas.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/partidos" className="btn btn-light text-success fw-bold rounded-pill px-4 shadow">
              Ver Fixture
            </Link>
            <Link to="/entradas" className="btn btn-warning text-dark fw-bold rounded-pill px-4 shadow">
              Comprar e-Ticket
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-4">
          <h2 className="h5 fw-bold text-uppercase">Accesos Directos</h2>
          <div className="bg-success mx-auto mt-2" style={{ height: 3, width: 40, borderRadius: 2 }}></div>
        </div>

        <div className="row row-cols-2 row-cols-md-3 g-3 g-md-4">
          {accesos.map((a) => (
            <div className="col" key={a.ruta}>
              <Link to={a.ruta} className="text-decoration-none">
                <div
                  className={`card card-hover border-0 shadow-sm rounded-4 text-center p-4 h-100 ${
                    a.destacado ? 'bg-dark-green text-white' : ''
                  }`}
                >
                  <span className="display-5 mb-2">{a.icono}</span>
                  <h3 className={`h6 fw-bold mb-0 ${a.destacado ? 'text-warning' : 'text-dark'}`}>
                    {a.titulo}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}