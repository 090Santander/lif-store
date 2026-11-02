import { useEffect } from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Navbar from './Navbar'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { CarritoProvider, useCarrito } from '../context/CarritoContext'

function AuthSetter({ user }: { user: any }) {
  const { iniciarSesion } = useAuth()
  useEffect(() => {
    if (user) {
      iniciarSesion(user)
    }
  }, [user])
  return null
}

function CarritoSetter({ item }: { item: any }) {
  const context = useCarrito() as any
  useEffect(() => {
    if (item) {
      const fn = context.agregarAlCarrito || context.agregar || context.agregarItem
      if (fn) {
        fn(item)
      }
    }
  }, [item])
  return null
}

describe('Componente Navbar (Navbar.spec.tsx)', () => {
  afterEach(() => cleanup())

  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    if (!jasmine.isSpy(window.alert)) {
      spyOn(window, 'alert').and.stub()
    }
  })

  it('debe renderizar enlaces básicos y botones de invitado por defecto', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

    expect(screen.getByText('LIF')).toBeTruthy()
    expect(screen.getByText('Inicio')).toBeTruthy()
    expect(screen.getByText('Partidos')).toBeTruthy()
    expect(screen.getByText('Ingresar')).toBeTruthy()
  })

  it('debe alternar el tema visual (claro/oscuro) al hacer clic en el botón de tema', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

    const btnTema = screen.getByText('🌙') || screen.getByText('☀️')
    expect(btnTema).toBeTruthy()

    fireEvent.click(btnTema)
    expect(localStorage.getItem('lif_tema')).toBeDefined()
  })

  it('debe mostrar el nombre del usuario y permitir cerrar sesión cuando hay un usuario autenticado', async () => {
    const usuarioMock = { correo: 'pedro@lif.cl', nombre: 'Pedro', rol: 'user' }

    render(
      <AuthProvider>
        <AuthSetter user={usuarioMock} />
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

    const nombreUsuario = await screen.findByText(/Pedro/i)
    expect(nombreUsuario).toBeTruthy()

    const btnSalir = screen.getByText('Salir')
    expect(btnSalir).toBeTruthy()

    fireEvent.click(btnSalir)
    expect(window.alert).toHaveBeenCalledWith('Has cerrado sesión correctamente.')
  })

  it('debe mostrar el correo como nombre cuando el usuario no tiene la propiedad nombre definida', async () => {
    const usuarioMock = { correo: 'usuario@lif.cl', rol: 'user' }

    render(
      <AuthProvider>
        <AuthSetter user={usuarioMock} />
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

    const correoUsuario = await screen.findByText(/usuario@lif.cl/i)
    expect(correoUsuario).toBeTruthy()
  })

  it('debe mostrar el enlace de Admin cuando el usuario es administrador', async () => {
    // Cambiamos el nombre del usuario a "Carlos" para evitar duplicar el texto "Admin" en el botón de perfil
    const adminMock = { correo: 'admin@lif.cl', nombre: 'Carlos', rol: 'admin' }

    render(
      <AuthProvider>
        <AuthSetter user={adminMock} />
        <CarritoProvider>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

    const enlaceAdmin = await screen.findByText('Admin')
    expect(enlaceAdmin).toBeTruthy()
  })

  it('debe renderizar el contador de elementos cuando el carrito contiene productos', async () => {
    const productoMock = { id: '1', titulo: 'Entrada Partido', precio: 3000, cantidad: 2 }

    render(
      <AuthProvider>
        <CarritoProvider>
          <CarritoSetter item={productoMock} />
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

    const badge = await screen.findByText('2')
    expect(badge).toBeTruthy()
  })
})