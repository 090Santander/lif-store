import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function RutaAdmin() {
  const { esAdmin, usuario, cargando } = useAuth()

  if (cargando) return <p className="container py-5 text-center text-body-secondary" role="status">Verificando permisos…</p>
  if (!esAdmin) return <Navigate to={usuario ? '/' : '/login'} replace />
  return <Outlet />
}
