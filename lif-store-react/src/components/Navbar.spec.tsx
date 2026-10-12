import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Navbar from './Navbar'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'
import { DatosLIF } from '../data/datosLIF'

describe('Navbar Component', () => {
  beforeEach(() => {
    spyOn(window, 'alert').and.stub()
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  const renderNavbar = (temaInicial = 'light') => {
    if (temaInicial === 'dark') {
      localStorage.setItem('lif_tema', 'dark')
    }

    return render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )
  }

  it('debe renderizar enlaces básicos y botones de invitado por defecto', () => {
    renderNavbar()
    expect(screen.getByText('LIF')).toBeTruthy()
    expect(screen.getByText('Inicio')).toBeTruthy()
    expect(screen.getByText('Registrarse')).toBeTruthy()
    expect(screen.getByText('Ingresar')).toBeTruthy()
  })

  it('debe alternar el tema al hacer clic en el botón de cambio de tema', () => {
    renderNavbar('light')

    const botonTema = screen.getByText('🌙')
    fireEvent.click(botonTema)
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark')

    const botonTemaDark = screen.getByText('☀️')
    fireEvent.click(botonTemaDark)
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light')
  })

  it('debe permitir cerrar sesión cuando hay un usuario activo', () => {
    DatosLIF.setUsuario({
      nombre: 'Pedro',
      correo: 'pedro@lif.cl',
      rol: 'usuario'
    })

    renderNavbar()

    expect(screen.getByText('👤 Mi Perfil')).toBeTruthy()

    const botonSalir = screen.getByText('Salir')
    fireEvent.click(botonSalir)

    expect(window.alert).toHaveBeenCalledWith('Has cerrado sesión correctamente.')
  })

  it('debe mostrar la opción Admin cuando el usuario es administrador', () => {
    DatosLIF.setUsuario({
      nombre: 'Admin LIF',
      correo: 'admin@lif.cl',
      rol: 'admin'
    })

    renderNavbar()
    expect(screen.getByText('Admin')).toBeTruthy()
  })
})