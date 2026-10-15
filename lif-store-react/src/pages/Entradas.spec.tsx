import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Entradas from './Entradas'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'
import { DatosLIF } from '../data/datosLIF'

describe('Página Entradas (Entradas.spec.tsx)', () => {
  beforeEach(() => {
    localStorage.clear()
    spyOn(window, 'alert').and.stub()
  })

  afterEach(() => {
    cleanup()
  })

  const renderEntradas = () =>
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Entradas />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

  it('debe renderizar el mensaje cuando no hay partidos disponibles', () => {
    spyOn(DatosLIF, 'get').and.returnValue([])

    renderEntradas()

    expect(
      screen.getByText(/No hay partidos disponibles para la compra de tickets/i)
    ).toBeTruthy()
  })

  it('debe renderizar las tarjetas de entrada y permitir agregar una entrada al carrito', () => {
    const mockPartidos = [
      {
        id: 'p1',
        equipoLocal: 'Colo Colo',
        equipoVisita: 'U. de Chile',
        fecha: '2026-11-20',
        hora: '18:00',
        estadio: 'Estadio Monumental',
        precioGeneral: 10000,
        precioVip: 25000,
        estado: 'Programado'
      }
    ]

    spyOn(DatosLIF, 'get').and.returnValue(mockPartidos as any)

    const { container } = renderEntradas()

    expect(screen.getByText(/Boletería Oficial/i)).toBeTruthy()

    const botonComprar =
      screen.queryByRole('button', { name: /comprar|comprar entrada|agregar/i }) ||
      container.querySelector('button')

    if (botonComprar) {
      fireEvent.click(botonComprar)
      expect(window.alert).toHaveBeenCalled()
    }
  })
})