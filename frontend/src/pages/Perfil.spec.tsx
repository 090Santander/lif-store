import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import Perfil from './Perfil'
import { AuthProvider } from '../context/AuthContext'
import { DatosLIF } from '../data/datosLIF'

const mockUser = {
  nombre: 'Juan Pérez',
  correo: 'juan@lif.cl',
  rut: '19.000.000-0',
  rol: 'usuario'
}

function establecerSesion() {
  const data = JSON.stringify(mockUser)
  const keys = ['lif_usuario', 'usuario', 'user', 'session', 'auth']
  keys.forEach((k) => {
    try { localStorage.setItem(k, data) } catch (e) {}
    try { sessionStorage.setItem(k, data) } catch (e) {}
  })

  if (DatosLIF && typeof (DatosLIF as any).setUsuario === 'function') {
    try { (DatosLIF as any).setUsuario(mockUser) } catch (e) {}
  }
}

function borrarSesion() {
  localStorage.clear()
  sessionStorage.clear()

  if (DatosLIF && typeof (DatosLIF as any).cerrarSesion === 'function') {
    try { (DatosLIF as any).cerrarSesion() } catch (e) {}
  } else if (DatosLIF && typeof (DatosLIF as any).setUsuario === 'function') {
    try { (DatosLIF as any).setUsuario(null) } catch (e) {}
  }
}

describe('Página Perfil (Perfil.spec.tsx)', () => {
  beforeEach(() => {
    borrarSesion()
    spyOn(window, 'alert').and.stub()
  })

  afterEach(() => cleanup())

  it('debe redirigir a /login cuando no hay usuario autenticado', async () => {
    borrarSesion()

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/perfil']}>
          <Routes>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/login" element={<div>Vista Login</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    )

    expect(await screen.findByText('Vista Login')).toBeTruthy()
  })

  it('debe mostrar la información del perfil cuando el usuario está autenticado', async () => {
    establecerSesion()

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/perfil']}>
          <Routes>
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    )

    const nombres = await screen.findAllByText('Juan Pérez')
    expect(nombres.length).toBeGreaterThan(0)

    const correos = await screen.findAllByText('juan@lif.cl')
    expect(correos.length).toBeGreaterThan(0)

    expect(screen.getByText('Perfil de Usuario')).toBeTruthy()
    expect(screen.getByText('Nombre Completo')).toBeTruthy()
    expect(screen.getByText('Correo Electrónico')).toBeTruthy()
    expect(screen.getByText('Estado de Cuenta')).toBeTruthy()
    expect(screen.getByText('Miembro desde')).toBeTruthy()
    expect(screen.getByText('Mis Datos')).toBeTruthy()
    expect(screen.getByText('Comprar Entradas')).toBeTruthy()
    expect(screen.getByText('Mis solicitudes')).toBeTruthy()
  })

  it('debe cerrar sesión correctamente al hacer clic en el botón', async () => {
    establecerSesion()

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/perfil']}>
          <Routes>
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/" element={<div>Vista Inicio</div>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    )

    const botonCerrar = await screen.findByRole('button', { name: /cerrar sesión/i })
    fireEvent.click(botonCerrar)

    expect(window.alert).toHaveBeenCalledWith('Has cerrado sesión correctamente.')
    expect(await screen.findByText('Vista Inicio')).toBeTruthy()
  })
})