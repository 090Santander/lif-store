/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import { DatosLIF, type Usuario } from '../data/datosLIF'

interface AuthContextValue {
  usuario: Usuario | null
  esAdmin: boolean
  iniciarSesion: (usuario: Usuario) => void
  cerrarSesion: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => DatosLIF.getUsuario())

  const iniciarSesion = (u: Usuario) => {
    DatosLIF.setUsuario(u)
    setUsuario(u)
  }

  const cerrarSesion = () => {
    DatosLIF.cerrarSesion()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider
      value={{ usuario, esAdmin: usuario?.rol === 'admin', iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}