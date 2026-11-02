import PageHero from '../components/PageHero'
import NoticiaDestacada from '../components/NoticiaDestacada'
import NoticiaCard from '../components/NoticiaCard'
import type { Noticia } from '../data/datosLIF'
import { useColeccion } from '../hooks/useColeccion'

export default function Noticias() {
  const { items: noticias, cargando, error } = useColeccion<Noticia>('noticias')

  const destacada = noticias.find((n) => n.destacada) ?? noticias[0]
  const restantes = noticias.filter((n) => n.id !== destacada?.id)

  return (
    <>
      <PageHero
        etiqueta="Actualidad"
        titulo="Noticias y Prensa LIF"
        subtitulo="Mantente al día con los resultados, crónicas y comunicados de la liga"
      />

      <section className="container py-5">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {cargando ? (
          <p className="text-center text-body-secondary py-4" role="status">Cargando noticias…</p>
        ) : !destacada ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center text-body-secondary">
            <p className="fs-5 mb-0">📰 No hay noticias publicadas en este momento.</p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <NoticiaDestacada noticia={destacada} />
            </div>

            <h2 className="h4 fw-bold text-body mb-4">Últimas Publicaciones</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
              {restantes.map((n) => (
                <NoticiaCard key={n.id} noticia={n} />
              ))}
            </div>

            <nav aria-label="Navegación de páginas de noticias">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <button type="button" className="page-link border-0 shadow-sm rounded-start-pill" disabled>
                    Anterior
                  </button>
                </li>
                <li className="page-item active" aria-current="page">
                  <button type="button" className="page-link border-0 shadow-sm bg-success text-white">
                    1
                  </button>
                </li>
                <li className="page-item">
                  <button type="button" className="page-link border-0 shadow-sm text-success">2</button>
                </li>
                <li className="page-item">
                  <button type="button" className="page-link border-0 shadow-sm rounded-end-pill text-success fw-bold">
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </section>
    </>
  )
}
