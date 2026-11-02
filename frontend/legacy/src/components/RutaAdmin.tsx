import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function RutaAdmin() {
  const { esAdmin } = useAuth()

  if (!esAdmin) return <Navigate to="/" replace />
  return <Outlet />
}