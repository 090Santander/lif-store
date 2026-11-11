interface PageHeroProps {
  etiqueta: string
  titulo: string
  subtitulo?: string
  claseEtiqueta?: string
}

export default function PageHero({
  etiqueta,
  titulo,
  subtitulo,
  claseEtiqueta = 'bg-warning text-dark shadow-sm',
}: PageHeroProps) {
  return (
    <section className="hero-green text-white py-4 text-center">
      <div className="container py-2">
        <span className={`badge fw-bold px-3 py-1 rounded-pill text-uppercase mb-2 ${claseEtiqueta}`}>
          {etiqueta}
        </span>
        <h1 className="fw-black display-6 mb-0 text-shadow">{titulo}</h1>
        {subtitulo && <p className="mb-0 mt-2 text-white-50 small">{subtitulo}</p>}
      </div>
    </section>
  )
}