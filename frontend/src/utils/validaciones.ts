export interface CamposRegistro {
  run: string
  correo: string
  nombre: string
  apellidos: string
  clave: string
  claveConfirma: string
}

export type ErroresRegistro = Partial<Record<keyof CamposRegistro, string>>

const REGEX_RUN = /^[0-9]{7,8}[0-9K]$/i // 7-8 dígitos + dígito verificador, sin puntos ni guión
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LARGO_MINIMO_CLAVE = 8

export function validarRun(run: string): string | null {
  if (!run.trim()) return 'El RUN es obligatorio.'
  const normalizado = run.trim().toUpperCase()
  if (!REGEX_RUN.test(normalizado)) return 'RUN inválido: 7 u 8 dígitos y el verificador, sin puntos ni guión.'

  const digitos = normalizado.slice(0, -1)
  let suma = 0
  let multiplicador = 2
  for (let i = digitos.length - 1; i >= 0; i--) {
    suma += Number(digitos[i]) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }
  const calculado = 11 - (suma % 11)
  const verificador = calculado === 11 ? '0' : calculado === 10 ? 'K' : String(calculado)
  if (normalizado.at(-1) !== verificador) return 'El dígito verificador del RUN no es válido.'
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
