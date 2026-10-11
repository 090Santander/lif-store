import { useState, type FormEvent } from 'react'
import Campo from '../Campo'
import CampoSelect from '../CampoSelect'
import type { TipoSolicitudDef } from '../../data/solicitud'
import { validarSolicitud, valoresIniciales, type ErroresSolicitud } from '../../utils/solicitudes'

interface FormSolicitudProps {
  def: TipoSolicitudDef
  onEnviar: (datos: Record<string, string>, detalle: string) => void
}

export default function FormSolicitud({ def, onEnviar }: FormSolicitudProps) {
  const [datos, setDatos] = useState(() => valoresIniciales(def))
  const [detalle, setDetalle] = useState('')
  const [errores, setErrores] = useState<ErroresSolicitud>({})

  const cambiar = (id: string) => (valor: string) => setDatos({ ...datos, [id]: valor })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const nuevos = validarSolicitud(def, datos, detalle)
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    onEnviar(datos, detalle)
    setDatos(valoresIniciales(def))
    setDetalle('')
    setErrores({})
  }

  return (
    <form noValidate onSubmit={enviar}>
      <div className="row g-2">
        {def.campos.map((c) => (
          <div className={`col-md-${c.ancho ?? 6}`} key={c.id}>
            {c.tipo === 'select' ? (
              <CampoSelect
                id={`sol-${c.id}`}
                etiqueta={c.etiqueta}
                opciones={c.opciones ?? []}
                value={datos[c.id]}
                onChange={cambiar(c.id)}
              />
            ) : (
              <Campo
                id={`sol-${c.id}`}
                etiqueta={c.etiqueta}
                type={c.tipo}
                required={c.requerido}
                min={c.min}
                max={c.max}
                maxLength={c.maxLength}
                placeholder={c.placeholder}
                value={datos[c.id]}
                onChange={cambiar(c.id)}
                error={errores[c.id]}
              />
            )}
          </div>
        ))}

        <div className="col-12">
          <Campo
            id="sol-detalle"
            etiqueta={def.detalleEtiqueta}
            filas={4}
            required={def.detalleRequerido}
            placeholder={def.detallePlaceholder}
            value={detalle}
            onChange={setDetalle}
            error={errores.detalle}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold mt-3">
        Enviar solicitud
      </button>
    </form>
  )
}