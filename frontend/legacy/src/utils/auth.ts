import type { Usuario } from '../data/datosLIF'

export const ADMIN_CORREO = 'admin@lifchile.cl'
export const ADMIN_CLAVE = 'admin123'
const LARGO_MINIMO_CLAVE = 4

export function validarCredenciales(correo: string, clave: string): boolean {
  return correo.trim() !== '' && clave.length >= LARGO_MINIMO_CLAVE
}

export function crearSesion(correo: string, clave: string): Usuario {
  const correoLimpio = correo.toLowerCase().trim()
  const esAdmin = correoLimpio === ADMIN_CORREO && clave === ADMIN_CLAVE

  return {
    nombre: correoLimpio.split('@')[0],
    correo: correoLimpio,
    rol: esAdmin ? 'admin' : 'usuario',
  }
}