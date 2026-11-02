/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { apiGet, apiPost, borrarToken, guardarToken, obtenerToken } from '../api/client'
import type { Usuario } from '../data/datosLIF'

interface RespuestaAutenticacion {
  token: string
  usuario: Usuario
}

interface AuthContextValue {
  usuario: Usuario | null
  esAdmin: boolean
  cargando: boolean
  iniciarSesion: (correo: string, clave: string) => Promise<Usuario>
  cerrarSesion: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [cargando, setCargando] = useState(() => Boolean(obtenerToken()))

  const cerrarSesion = useCallback(() => {
    borrarToken()
    localStorage.removeItem('LIF_USUARIO_ACTIVO')
    setUsuario(null)
  }, [])

  useEffect(() => {
    let activo = true
    const token = obtenerToken()

    const cerrarSesionExpirada = () => {
      if (activo) setUsuario(null)
    }
    window.addEventListener('lif:unauthorized', cerrarSesionExpirada)

    if (!token) {
      return () => {
        activo = false
        window.removeEventListener('lif:unauthorized', cerrarSesionExpirada)
      }
    }

    apiGet<Usuario>('/auth/me')
      .then((perfil) => {
        if (activo) setUsuario(perfil)
      })
      .catch(() => {
        borrarToken()
        if (activo) setUsuario(null)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
      window.removeEventListener('lif:unauthorized', cerrarSesionExpirada)
    }
  }, [])

  const iniciarSesion = async (correo: string, clave: string) => {
    setCargando(true)
    try {
      const respuesta = await apiPost<RespuestaAutenticacion>('/auth/login', { correo, clave }, false)
      guardarToken(respuesta.token)
      setUsuario(respuesta.usuario)
      return respuesta.usuario
    } finally {
      setCargando(false)
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, esAdmin: usuario?.rol === 'admin', cargando, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
