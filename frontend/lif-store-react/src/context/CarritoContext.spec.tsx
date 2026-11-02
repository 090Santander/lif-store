import { render, act } from '@testing-library/react'
import { CarritoProvider, useCarrito } from './CarritoContext'
import type { ItemCarrito } from './CarritoContext'

let ctx!: ReturnType<typeof useCarrito>

const Captura = () => {
  ctx = useCarrito()
  return null
}

const renderProvider = () =>
  render(
    <CarritoProvider>
      <Captura />
    </CarritoProvider>
  )

const crearItem = (id: number | string, precio = 100, cantidad = 1): ItemCarrito => ({
  id,
  nombre: `Entrada ${id}`,
  precio,
  cantidad,
})

const itemSinCantidad = (id: number): ItemCarrito =>
  ({ id, nombre: `Entrada ${id}`, precio: 100 }) as unknown as ItemCarrito

describe('CarritoContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('estado inicial', () => {
    it('empieza con el carrito vacío cuando no hay datos guardados', () => {
      renderProvider()
      expect(ctx.carrito).toEqual([])
    })

    it('recupera el carrito guardado en localStorage', () => {
      localStorage.setItem('carrito_lif', JSON.stringify([crearItem(1, 500, 2)]))
      renderProvider()
      expect(ctx.carrito.length).toBe(1)
      expect(ctx.carrito[0].cantidad).toBe(2)
    })

    it('empieza vacío cuando el contenido guardado no es JSON válido', () => {
      localStorage.setItem('carrito_lif', '{no-es-json')
      renderProvider()
      expect(ctx.carrito).toEqual([])
    })

    it('empieza vacío cuando localStorage lanza un error al leer', () => {
      spyOn(Storage.prototype, 'getItem').and.throwError('Error simulado')
      renderProvider()
      expect(ctx.carrito).toEqual([])
    })
  })

  describe('persistencia', () => {
    it('guarda el carrito en localStorage cada vez que cambia', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1)))
      const guardado = JSON.parse(localStorage.getItem('carrito_lif') as string)
      expect(guardado.length).toBe(1)
      expect(guardado[0].id).toBe(1)
    })

    it('registra un error en consola cuando no se puede guardar', () => {
      spyOn(Storage.prototype, 'setItem').and.throwError('Error simulado')
      spyOn(console, 'error')
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1)))
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('agregarAlCarrito', () => {
    it('agrega un item nuevo con su cantidad', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1, 100, 3)))
      expect(ctx.carrito.length).toBe(1)
      expect(ctx.carrito[0].cantidad).toBe(3)
    })

    it('asigna cantidad 1 a un item nuevo que no trae cantidad', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(itemSinCantidad(1)))
      expect(ctx.carrito[0].cantidad).toBe(1)
    })

    it('suma la cantidad cuando el item ya existe', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1, 100, 2)))
      act(() => ctx.agregarAlCarrito(crearItem(1, 100, 3)))
      expect(ctx.carrito.length).toBe(1)
      expect(ctx.carrito[0].cantidad).toBe(5)
    })

    it('suma 1 cuando el item repetido no trae cantidad', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1, 100, 2)))
      act(() => ctx.agregarAlCarrito(itemSinCantidad(1)))
      expect(ctx.carrito[0].cantidad).toBe(3)
    })

    it('solo modifica el item repetido y deja los demás intactos', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1, 100, 1)))
      act(() => ctx.agregarAlCarrito(crearItem(2, 200, 1)))
      act(() => ctx.agregarAlCarrito(crearItem(2, 200, 4)))
      expect(ctx.carrito.length).toBe(2)
      expect(ctx.carrito[0].cantidad).toBe(1)
      expect(ctx.carrito[1].cantidad).toBe(5)
    })
  })

  describe('eliminarDelCarrito', () => {
    it('quita solo el item con el id indicado', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1)))
      act(() => ctx.agregarAlCarrito(crearItem(2)))
      act(() => ctx.eliminarDelCarrito(1))
      expect(ctx.carrito.map((i) => i.id)).toEqual([2])
    })

    it('no cambia nada si el id no existe', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1)))
      act(() => ctx.eliminarDelCarrito(99))
      expect(ctx.carrito.length).toBe(1)
    })
  })

  describe('vaciarCarrito', () => {
    it('elimina todos los items', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1)))
      act(() => ctx.agregarAlCarrito(crearItem(2)))
      act(() => ctx.vaciarCarrito())
      expect(ctx.carrito).toEqual([])
    })
  })

  describe('totales', () => {
    it('devuelve 0 en total y cantidad cuando el carrito está vacío', () => {
      renderProvider()
      expect(ctx.obtenerTotal()).toBe(0)
      expect(ctx.obtenerCantidadTotal()).toBe(0)
    })

    it('calcula el total en dinero y la cantidad de entradas', () => {
      renderProvider()
      act(() => ctx.agregarAlCarrito(crearItem(1, 1000, 2)))
      act(() => ctx.agregarAlCarrito(crearItem(2, 500, 3)))
      expect(ctx.obtenerTotal()).toBe(3500)
      expect(ctx.obtenerCantidadTotal()).toBe(5)
    })
  })

  describe('useCarrito', () => {
    it('lanza un error si se usa fuera de un CarritoProvider', () => {
      spyOn(console, 'error')
      expect(() => render(<Captura />)).toThrowError(
        'useCarrito debe ser usado dentro de un CarritoProvider'
      )
    })
  })
})