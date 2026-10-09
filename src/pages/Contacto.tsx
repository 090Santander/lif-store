import { useState, type FormEvent } from 'react'
import PageHero from '../components/PageHero'
import Campo from '../components/Campo'
import CampoSelect from '../components/CampoSelect'

const valoresLiga = [
  { icono: '⚽', texto: 'Pasión' },
  { icono: '🤝', texto: 'Fair Play' },
  { icono: '🚀', texto: 'Innovación' },
]

const datosContacto = [
  { etiqueta: 'Sede', valor: 'Av. Las Torres #1230, Peñalolén' },
  { etiqueta: 'Teléfono', valor: '+56 2 2987 6543 / +56 9 8765 4321' },
  { etiqueta: 'Correo', valor: 'contacto@ligalif.cl' },
  { etiqueta: 'Atención', valor: 'Lunes a Viernes (09:00 - 18:00 hrs)' },
]

const motivos = ['Consulta General', 'Soporte de Entradas', 'Inscripción de Equipo']

const vacio = { nombre: '', correo: '', telefono: '', motivo: motivos[0], mensaje: '' }

export default function Contacto() {
  const [form, setForm] = useState(vacio)

  const cambiar = (campo: keyof typeof vacio) => (valor: string) =>
    setForm({ ...form, [campo]: valor })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    alert('Mensaje enviado con éxito')
    setForm(vacio)
  }

  return (
    <>
      <PageHero
        etiqueta="Pasión & Deporte"
        titulo="Nosotros y Contacto"
        subtitulo="Nuestra organización y canales directos de atención"
      />

      <section className="container py-5">
        <div className="row g-4 mb-5 align-items-center">
          <div className="col-lg-7">
            <span className="badge bg-success mb-2 px-3 py-1 rounded-pill">Institucional</span>
            <h2 className="h3 fw-black text-body mb-3">Nuestra Organización</h2>
            <p className="text-body-secondary mb-4">
              Fomentamos el fútbol amateur y competitivo en un entorno organizado, ofreciendo gestión digital de
              fixtures, resultados en vivo y boletería electrónica con código QR.
            </p>

            <div className="row g-3 text-center">
              {valoresLiga.map((v) => (
                <div className="col-4" key={v.texto}>
                  <div className="p-3 border-0 shadow-sm rounded-4 bg-body card-hover">
                    <span className="display-6">{v.icono}</span>
                    <h3 className="h6 fw-bold text-body mb-0 mt-2">{v.texto}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 bg-dark-green text-white p-4 shadow-sm rounded-4">
              <h3 className="h5 fw-bold mb-3 border-bottom border-success pb-2 text-warning">
                📍 Datos de Contacto Directo
              </h3>
              <div className="d-flex flex-column gap-3">
                {datosContacto.map((d) => (
                  <p className="small mb-0" key={d.etiqueta}>
                    <strong>{d.etiqueta}:</strong> {d.valor}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
              <h2 className="h4 fw-black text-body mb-4">💬 Envíanos un mensaje</h2>
              <form onSubmit={enviar}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Campo id="c-nombre" etiqueta="Nombre Completo" placeholder="Ej: Juan Pérez"
                      value={form.nombre} onChange={cambiar('nombre')} />
                  </div>
                  <div className="col-md-6">
                    <Campo id="c-correo" etiqueta="Correo Electrónico" type="email" placeholder="ejemplo@correo.com"
                      value={form.correo} onChange={cambiar('correo')} />
                  </div>
                  <div className="col-md-6">
                    <Campo id="c-telefono" etiqueta="Teléfono / WhatsApp" type="tel" required={false}
                      placeholder="+56 9 1234 5678" value={form.telefono} onChange={cambiar('telefono')} />
                  </div>
                  <div className="col-md-6">
                    <CampoSelect id="c-motivo" etiqueta="Motivo" opciones={motivos}
                      value={form.motivo} onChange={cambiar('motivo')} />
                  </div>
                  <div className="col-12">
                    <Campo id="c-mensaje" etiqueta="Mensaje" filas={4} placeholder="Escribe tu consulta aquí..."
                      value={form.mensaje} onChange={cambiar('mensaje')} />
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-success fw-bold rounded-pill w-100 py-2 shadow-sm">
                      Enviar Mensaje 🚀
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}