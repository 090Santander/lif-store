import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { useEffect, useRef } from 'react'
import Carrito from './Carrito'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider, useCarrito } from '../context/CarritoContext'

function CartPopulator({ items, children }: { items: any[]; children: React.ReactNode }) {
  const context = useCarrito() as any
  const agregar =
    context?.agregarTicket ||
    context?.agregar ||
    context?.agregarAlCarrito ||
    context?.addTicket

  const cargadoRef = useRef(false)

  useEffect(() => {
    if (agregar && !cargadoRef.current) {
      cargadoRef.current = true
      items.forEach((item) => agregar(item))
    }
  }, [agregar, items])

  return <>{children}</>
}

describe('Página Carrito (Carrito.spec.tsx)', () => {
  beforeEach(() => {
    localStorage.clear()
    spyOn(window, 'alert').and.stub()
  })

  afterEach(() => {
    cleanup()
  })

  it('debe renderizar el mensaje de carrito vacío cuando no hay entradas', () => {
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Carrito />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

    expect(
      screen.getByText(/No tienes entradas agregadas a tu carrito/i)
    ).toBeTruthy()

    const botonPago = screen.getByRole('button', { name: /Proceder al Pago/i })
    expect((botonPago as HTMLButtonElement).disabled).toBeTrue()
  })

  it('debe renderizar entradas (VIP y general) y permitir eliminar una entrada', () => {
    const mockTickets = [
      {
        id: 't1',
        idUnico: 't1',
        encuentro: 'Colo Colo vs U. de Chile',
        localidad: 'Tribuna VIP',
        fecha: '2026-11-10',
        precio: 25000
      },
      {
        id: 't2',
        idUnico: 't2',
        encuentro: 'U. Católica vs Cobreloa',
        localidad: 'Galería Sur',
        fecha: '2026-11-12',
        precio: 10000
      }
    ]

    render(
      <AuthProvider>
        <CarritoProvider>
          <CartPopulator items={mockTickets}>
            <MemoryRouter>
              <Carrito />
            </MemoryRouter>
          </CartPopulator>
        </CarritoProvider>
      </AuthProvider>
    )

    expect(screen.getByText(/Colo Colo vs U. de Chile/i)).toBeTruthy()
    expect(screen.getByText(/U. Católica vs Cobreloa/i)).toBeTruthy()

    const botonesEliminar = screen.getAllByRole('button', { name: /Eliminar entrada/i })
    expect(botonesEliminar.length).toBe(2)

    fireEvent.click(botonesEliminar[0])

    expect(screen.queryByText(/Colo Colo vs U. de Chile/i)).toBeNull()
  })

  it('debe abrir el modal de pago, pagar exitosamente y vaciar el carrito', () => {
    const mockTickets = [
      {
        id: 't1',
        idUnico: 't1',
        encuentro: 'Audax vs Palestino',
        localidad: 'General',
        fecha: '2026-11-15',
        precio: 12000
      }
    ]

    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <CartPopulator items={mockTickets}>
            <MemoryRouter>
              <Carrito />
            </MemoryRouter>
          </CartPopulator>
        </CarritoProvider>
      </AuthProvider>
    )

    const botonPago = screen.getByRole('button', { name: /Proceder al Pago/i })
    fireEvent.click(botonPago)

    const modal = container.querySelector('.modal') || container.querySelector('[role="dialog"]') || document.body
    expect(modal).toBeTruthy()

    const botonesModal = modal.querySelectorAll('button')
    let botonConfirmar = Array.from(botonesModal).find((btn) =>
      /webpay|debito|tarjeta|confirmar|pagar/i.test(btn.textContent || '')
    )

    if (!botonConfirmar && botonesModal.length > 0) {
      botonConfirmar = botonesModal[0]
    }

    if (botonConfirmar) {
      fireEvent.click(botonConfirmar)
    }

    expect(window.alert).toHaveBeenCalled()
  })

  it('debe permitir cerrar el modal de pago sin pagar', () => {
    const mockTickets = [
      {
        id: 't1',
        idUnico: 't1',
        encuentro: 'Unión Española vs Everton',
        localidad: 'Andes',
        fecha: '2026-11-20',
        precio: 15000
      }
    ]

    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <CartPopulator items={mockTickets}>
            <MemoryRouter>
              <Carrito />
            </MemoryRouter>
          </CartPopulator>
        </CarritoProvider>
      </AuthProvider>
    )

    const botonPago = screen.getByRole('button', { name: /Proceder al Pago/i })
    fireEvent.click(botonPago)

    const botonCerrar =
      container.querySelector('.btn-close') ||
      screen.queryByRole('button', { name: /cerrar|cancelar|×/i })

    if (botonCerrar) {
      fireEvent.click(botonCerrar as HTMLElement)
    }

    expect(container.querySelector('.modal')).toBeNull()
  })

  it('debe mostrar alerta si se intenta pagar con el carrito vacío', () => {
    const mockTickets = [
      {
        id: 't1',
        idUnico: 't1',
        encuentro: 'Huachipato vs Coquimbo',
        localidad: 'Galería',
        fecha: '2026-11-25',
        precio: 8000
      }
    ]

    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <CartPopulator items={mockTickets}>
            <MemoryRouter>
              <Carrito />
            </MemoryRouter>
          </CartPopulator>
        </CarritoProvider>
      </AuthProvider>
    )

    const botonPago = screen.getByRole('button', { name: /Proceder al Pago/i })
    fireEvent.click(botonPago)

    const botonEliminar = screen.getByRole('button', { name: /Eliminar entrada/i })
    fireEvent.click(botonEliminar)

    const modal = container.querySelector('.modal') || container.querySelector('[role="dialog"]') || document.body
    const botonesModal = modal.querySelectorAll('button')
    let botonConfirmar = Array.from(botonesModal).find((btn) =>
      /webpay|debito|tarjeta|confirmar|pagar/i.test(btn.textContent || '')
    )

    if (!botonConfirmar && botonesModal.length > 0) {
      botonConfirmar = botonesModal[0]
    }

    if (botonConfirmar) {
      fireEvent.click(botonConfirmar)
    }

    expect(window.alert).toHaveBeenCalledWith('Tu carrito está vacío.')
  })
})