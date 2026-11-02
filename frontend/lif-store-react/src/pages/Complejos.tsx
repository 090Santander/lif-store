import { useState } from 'react'
import PageHero from '../components/PageHero'
import SedeCard from '../components/SedeCard'
import { sedes } from '../data/sede'

export default function Complejos() {
  const [activaId, setActivaId] = useState(sedes[0].id)
  const activa = sedes.find((s) => s.id === activaId) ?? sedes[0]

  return (
    <>
      <PageHero
        etiqueta="Infraestructura"
        titulo="Nuestras Sedes"
        subtitulo="Conoce dónde se vive la pasión de nuestra liga"
      />

      <section className="container py-5">
        <ul className="nav nav-pills justify-content-center mb-5 gap-3" role="tablist">
          {sedes.map((s) => (
            <li className="nav-item" role="presentation" key={s.id}>
              <button
                type="button"
                role="tab"
                aria-selected={s.id === activaId}
                className={`nav-link rounded-pill px-4 fw-bold shadow-sm ${
                  s.id === activaId ? 'active' : 'bg-body text-secondary'
                }`}
                onClick={() => setActivaId(s.id)}
              >
                {s.icono} {s.pestana}
              </button>
            </li>
          ))}
        </ul>

        <SedeCard sede={activa} />
      </section>
    </>
  )
}