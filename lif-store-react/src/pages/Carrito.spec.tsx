import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Carrito from './Carrito'
import { CarritoProvider, useCarrito } from '../context/CarritoContext'
import { useEffect } from 'react'

function CarritoSetter({ items }: { items: any[] }) {
  const { agregarAlCarrito, vaciarCarrito } = useCarrito()
  useEffect(() => {
    vaciarCarrito()
    items.forEach((item) => agregarAlCarrito(item))
  }, [items])
  return null
}

describe('Página Carrito (Carrito.spec.tsx)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => cleanup())

  it('debe renderizar la página de carrito correctamente', () => {
    render(
      <CarritoProvider>
        <MemoryRouter>
          <Carrito />
        </MemoryRouter>
      </CarritoProvider>
    )

    expect(screen.getByRole('heading', { name: /^Tu Carrito$/i })).toBeTruthy()
  })

  it('debe mostrar los elementos del carrito y los totales', () => {
    const itemMock = {
      id: '1',
      nombre: 'Entrada General',
      titulo: 'Entrada General',
      precio: 5000,
      cantidad: 1
    }

    render(
      <CarritoProvider>
        <CarritoSetter items={[itemMock]} />
        <MemoryRouter>
          <Carrito />
        </MemoryRouter>
      </CarritoProvider>
    )

    const precios = screen.getAllByText(/\$5\.000/i)
    expect(precios.length).toBeGreaterThan(0)
    expect(screen.getByText(/\$5\.500/i)).toBeTruthy()
  })
})