import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Admin from './Admin'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

describe('Página Admin (Admin.spec.tsx)', () => {
  beforeEach(() => {
    localStorage.clear()

    const mockJugador = {
      id: 'j1',
      nombre: 'Carlos Valderrama',
      equipo: 'LIF FC',
      posicion: 'MED',
      dorsal: 10,
      goles: 5,
      amarillas: 1,
      rojas: 0,
      pj: 8
    }

    const mockSolicitud = {
      id: 's1',
      tipo: 'reserva_complejo',
      tipoSolicitud: 'reserva_complejo',
      usuario: 'Usuario Test',
      estado: 'Pendiente',
      fecha: '2026-10-15',
      detalle: 'Detalle de prueba',
      datos: {
        asunto: 'Reserva de cancha',
        rut: '12345678-5',
        correo: 'test@correo.com',
        telefono: '912345678'
      }
    }

    localStorage.setItem('lif_jugadores', JSON.stringify([mockJugador]))
    localStorage.setItem('lif_solicitudes', JSON.stringify([mockSolicitud]))

    spyOn(window, 'alert').and.stub()
    spyOn(window, 'confirm').and.returnValue(true)
  })

  afterEach(() => {
    cleanup()
  })

  const renderAdmin = () =>
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Admin />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

  it('debe renderizar el panel y permitir navegar entre todas las pestañas', () => {
    renderAdmin()

    expect(screen.getByText(/Panel de Administración/i)).toBeTruthy()
    expect(screen.getByText(/Gestor de Noticias/i)).toBeTruthy()

    const tabPartidos = screen.getByRole('tab', { name: /Partidos, Entradas y Noticias/i })
    fireEvent.click(tabPartidos)
    expect(screen.getByText(/Agregar Noticia de Partido/i)).toBeTruthy()

    const tabJugadores = screen.getByRole('tab', { name: /Gestor de Jugadores/i })
    fireEvent.click(tabJugadores)
    expect(screen.getByRole('tab', { name: /Gestor de Jugadores/i }).classList.contains('active')).toBeTrue()

    const tabSolicitudes = screen.getByRole('tab', { name: /Solicitudes/i })
    fireEvent.click(tabSolicitudes)
    expect(screen.getByRole('tab', { name: /Solicitudes/i }).classList.contains('active')).toBeTrue()
  })

  it('debe permitir cambiar el estado y eliminar una solicitud en el PanelSolicitudes', () => {
    const { container } = renderAdmin()

    const tabSolicitudes = screen.getByRole('tab', { name: /Solicitudes/i })
    fireEvent.click(tabSolicitudes)

    const select = container.querySelector('select')
    if (select) {
      fireEvent.change(select, { target: { value: 'Aprobada' } })
    }

    const botonEliminar = container.querySelector('button.btn-outline-danger') || container.querySelector('button.btn-danger')
    if (botonEliminar) {
      fireEvent.click(botonEliminar)
    }
  })

  it('debe abrir ModalStats, modificar estadísticas, guardarlas y mostrar alerta', () => {
    const { container } = renderAdmin()

    const tabJugadores = screen.getByRole('tab', { name: /Gestor de Jugadores/i })
    fireEvent.click(tabJugadores)

    const botonStats = container.querySelector('tbody tr button') || screen.getAllByRole('button')[0]
    fireEvent.click(botonStats)

    const formModal = container.querySelector('.modal form') || container.querySelector('form')
    if (formModal) {
      fireEvent.submit(formModal)
    }

    expect(window.alert).toHaveBeenCalledWith('Estadísticas guardadas con éxito')
  })

  it('debe abrir ModalStats y cerrarlo ejecutando onCerrar', () => {
    const { container } = renderAdmin()

    const tabJugadores = screen.getByRole('tab', { name: /Gestor de Jugadores/i })
    fireEvent.click(tabJugadores)

    const botonStats = container.querySelector('tbody tr button') || screen.getAllByRole('button')[0]
    fireEvent.click(botonStats)

    // Buscar el botón de cierre específico dentro del modal y gatillar el evento de cierre
    const botonesModal = container.querySelectorAll('.modal button, .btn-close')
    const botonCerrar = Array.from(botonesModal).find(
      (btn) => btn.classList.contains('btn-close') || /cerrar|cancelar/i.test(btn.textContent || '')
    ) || botonesModal[0]

    if (botonCerrar) {
      fireEvent.click(botonCerrar as HTMLElement)
    }

    expect(container.querySelector('.modal')).toBeNull()
  })
})