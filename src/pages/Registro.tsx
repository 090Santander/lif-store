import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import Campo from '../components/Campo'
import { DatosLIF } from '../data/datosLIF'
import { validarRegistro, type CamposRegistro, type ErroresRegistro } from '../utils/validaciones'

const vacio: CamposRegistro = {
  run: '', correo: '', nombre: '', apellidos: '', clave: '', claveConfirma: '',
}

export default function Registro() {
  const [valores, setValores] = useState<CamposRegistro>(vacio)
  const [errores, setErrores] = useState<ErroresRegistro>({})
  const [exito, setExito] = useState(false)

  const cambiar = (campo: keyof CamposRegistro) => (valor: string) =>
    setValores({ ...valores, [campo]: valor })

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const nuevosErrores = validarRegistro(valores)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      setExito(false)
      return
    }

    // La contraseña no se guarda: este registro es solo una demostración.
    DatosLIF.agregar('usuarios', {
      run: valores.run.trim().toUpperCase(),
      correo: valores.correo.trim().toLowerCase(),
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
    })
    setValores(vacio)
    setExito(true)
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="col-12 col-md-10 col-lg-7 col-xl-6">
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div className="bg-dark-green text-white text-center py-4 px-4 border-bottom border-success border-4">
            <h1 className="h3 fw-black mb-1">Crear Cuenta</h1>
            <p className="small text-white-50 mb-0">
              Regístrate para comprar tus entradas y gestionar tus e-Tickets
            </p>
          </div>

          <div className="card-body p-4 p-md-5">
            <form noValidate onSubmit={enviar}>
              <div className="row g-3">
                <div className="col-md-6">
                  <Campo id="reg-run" etiqueta="RUN (sin puntos ni guión)" maxLength={9} placeholder="19011022K"
                    value={valores.run} onChange={cambiar('run')} error={errores.run} />
                </div>
                <div className="col-md-6">
                  <Campo id="reg-correo" etiqueta="Correo Electrónico" type="email" placeholder="correo@ejemplo.com"
                    value={valores.correo} onChange={cambiar('correo')} error={errores.correo} />
                </div>
                <div className="col-md-6">
                  <Campo id="reg-nombre" etiqueta="Nombre" placeholder="Juan"
                    value={valores.nombre} onChange={cambiar('nombre')} error={errores.nombre} />
                </div>
                <div className="col-md-6">
                  <Campo id="reg-apellidos" etiqueta="Apellidos" placeholder="Pérez Gómez"
                    value={valores.apellidos} onChange={cambiar('apellidos')} error={errores.apellidos} />
                </div>
                <div className="col-md-6">
                  <Campo id="reg-clave" etiqueta="Contraseña" type="password" placeholder="••••••••"
                    value={valores.clave} onChange={cambiar('clave')} error={errores.clave} />
                </div>
                <div className="col-md-6">
                  <Campo id="reg-clave-confirma" etiqueta="Confirmar Contraseña" type="password" placeholder="••••••••"
                    value={valores.claveConfirma} onChange={cambiar('claveConfirma')} error={errores.claveConfirma} />
                </div>
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-success btn-lg rounded-pill fw-bold shadow-sm">
                  Registrarme
                </button>
              </div>
            </form>

            {exito && (
              <div className="alert alert-success text-center mt-3 mb-0 rounded-3" role="alert">
                ¡Cuenta creada exitosamente!{' '}
                <Link to="/login" className="alert-link fw-bold">
                  Iniciar sesión ahora
                </Link>
                .
              </div>
            )}
          </div>

          <div className="card-footer bg-body-tertiary text-center py-3 border-0">
            <p className="small text-body-secondary mb-0">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-success fw-bold text-decoration-none">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}