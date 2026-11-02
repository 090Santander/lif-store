export interface CamposRegistro {
  run: string
  correo: string
  nombre: string
  apellidos: string
  clave: string
  claveConfirma: string
}

export type ErroresRegistro = Partial<Record<keyof CamposRegistro, string>>

// Supuestos míos (tu validaciones.js de registro no me llegó): ajústalos a tu pauta.
const REGEX_RUN = /^[0-9]{7,8}[0-9K]$/i // 7-8 dígitos + dígito verificador, sin puntos ni guión
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LARGO_MINIMO_CLAVE = 4

export function validarRun(run: string): string | null {
  if (!run.trim()) return 'El RUN es obligatorio.'
  if (!REGEX_RUN.test(run.trim())) return 'RUN inválido: 7 u 8 dígitos y el verificador, sin puntos ni guión.'
  return null
}

export function validarCorreo(correo: string): string | null {
  if (!correo.trim()) return 'El correo es obligatorio.'
  if (!REGEX_CORREO.test(correo.trim())) return 'Ingresa un correo válido.'
  return null
}

export function validarTexto(valor: string, etiqueta: string): string | null {
  return valor.trim() ? null : `${etiqueta} es obligatorio.`
}

export function validarClave(clave: string): string | null {
  if (!clave) return 'La contraseña es obligatoria.'
  if (clave.length < LARGO_MINIMO_CLAVE) return `Debe tener al menos ${LARGO_MINIMO_CLAVE} caracteres.`
  return null
}

export function validarConfirmacion(clave: string, confirma: string): string | null {
  if (!confirma) return 'Confirma tu contraseña.'
  if (clave !== confirma) return 'Las contraseñas no coinciden.'
  return null
}

export function validarRegistro(c: CamposRegistro): ErroresRegistro {
  const candidatos: ErroresRegistro = {
    run: validarRun(c.run) ?? undefined,
    correo: validarCorreo(c.correo) ?? undefined,
    nombre: validarTexto(c.nombre, 'El nombre') ?? undefined,
    apellidos: validarTexto(c.apellidos, 'Los apellidos') ?? undefined,
    clave: validarClave(c.clave) ?? undefined,
    claveConfirma: validarConfirmacion(c.clave, c.claveConfirma) ?? undefined,
  }

  // Dejamos solo los campos que realmente tienen error
  return Object.fromEntries(
    Object.entries(candidatos).filter(([, mensaje]) => mensaje !== undefined),
  ) as ErroresRegistro
}