import type { Sede } from '../data/sede'

export default function SedeCard({ sede }: { sede: Sede }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className={`row g-0 ${sede.invertida ? 'flex-lg-row-reverse' : ''}`}>
        <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center">
          <span className={`badge mb-3 align-self-start px-3 py-2 rounded-pill ${sede.claseEtiqueta}`}>
            {sede.etiqueta}
          </span>
          <h2 className="h3 fw-black text-body mb-2">{sede.nombre}</h2>
          <p className="text-body-secondary fw-bold mb-4">📍 {sede.direccion}</p>
          <p className="text-body-secondary mb-4">{sede.descripcion}</p>

          <h3 className="h6 fw-bold text-body mb-3">Servicios disponibles:</h3>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {sede.servicios.map((s) => (
              <span key={s} className="badge bg-body-secondary text-body border p-2">
                {s}
              </span>
            ))}
          </div>

          <a
            href={sede.enlaceMapa}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${sede.claseBoton} fw-bold rounded-pill shadow-sm align-self-start px-4`}
          >
            Cómo llegar (Ver Mapa)
          </a>
        </div>

        <div className={`col-lg-6 bg-body-tertiary ${sede.invertida ? 'border-end' : 'border-start'}`}>
          <div className="ratio ratio-1x1 h-100 min-vh-50">
            <iframe
              src={sede.mapaEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={sede.tituloMapa}
            />
          </div>
        </div>
      </div>
    </div>
  )
}