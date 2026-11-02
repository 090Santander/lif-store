import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import RutaAdmin from './RutaAdmin'
import { AuthProvider } from '../context/AuthContext'
import { DatosLIF, type Usuario } from '../data/datosLIF'

const usuarioConRol = (rol: string) => ({ rol }) as unknown as Usuario

const renderRutaAdmin = () =>
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route element={<RutaAdmin />}>
            <Route path="/admin" element={<div>Contenido Protegido</div>} />
          </Route>
          <Route path="*" element={<div>Destino de redirección</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )

describe('RutaAdmin', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    DatosLIF.cerrarSesion()
  })

  it('permite el acceso si el usuario es administrador', () => {
    DatosLIF.setUsuario(usuarioConRol('admin'))
    renderRutaAdmin()

    expect(screen.getByText('Contenido Protegido')).toBeTruthy()
  })

  it('redirige si el usuario no es administrador', () => {
    DatosLIF.setUsuario(usuarioConRol('hincha'))
    renderRutaAdmin()

    expect(screen.queryByText('Contenido Protegido')).toBeNull()
    expect(screen.getByText('Destino de redirección')).toBeTruthy()
  })

  it('redirige si no hay sesión iniciada', () => {
    renderRutaAdmin()

    expect(screen.queryByText('Contenido Protegido')).toBeNull()
    expect(screen.getByText('Destino de redirección')).toBeTruthy()
  })
})