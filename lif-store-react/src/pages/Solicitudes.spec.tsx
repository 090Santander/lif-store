import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Solicitudes from './Solicitudes'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'
import { DatosLIF } from '../data/datosLIF'

describe('Página Solicitudes (Solicitudes.spec.tsx)', () => {
  beforeEach(() => {
    spyOn(window, 'alert').and.stub()
  })

  afterEach(() => {
    cleanup()
  })

  it('debe renderizar la pantalla de bloqueo cuando no hay usuario autenticado', () => {
    spyOn(DatosLIF, 'getUsuario').and.returnValue(null)

    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Solicitudes />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

    expect(screen.getByText(/Inicia sesión para enviar una solicitud/i)).toBeTruthy()
  })

  it('debe permitir cambiar de tipo de solicitud y enviar el formulario con usuario autenticado', () => {
    const usuarioMock = {
      id: '1',
      nombre: 'Usuario Prueba',
      correo: 'usuario@prueba.com',
      rol: 'usuario'
    } as any

    spyOn(DatosLIF, 'getUsuario').and.returnValue(usuarioMock)

    const { container } = render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Solicitudes />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

    // 1. Confirmar renderizado en modo autenticado
    expect(screen.getByText(/¿Qué necesitas solicitar\?/i)).toBeTruthy()

    // 2. Probar interacción con SelectorTipo
    const botonesTipo = screen.queryAllByRole('button')
    if (botonesTipo.length > 1) {
      fireEvent.click(botonesTipo[0])
    }

    // 3. Asignar valores válidos a inputs segun RUT, email, teléfono, date, time, etc.
    const inputs = container.querySelectorAll('input')
    inputs.forEach((input) => {
      const idLower = (input.id || '').toLowerCase()
      const nameLower = (input.name || '').toLowerCase()
      const typeLower = (input.type || '').toLowerCase()

      let valor = 'Texto de prueba valido'
      if (idLower.includes('rut') || nameLower.includes('rut') || idLower.includes('run')) {
        valor = '12345678-5'
      } else if (idLower.includes('correo') || nameLower.includes('correo') || typeLower === 'email') {
        valor = 'prueba@correo.com'
      } else if (idLower.includes('tel') || nameLower.includes('tel') || typeLower === 'tel') {
        valor = '912345678'
      } else if (typeLower === 'date' || idLower.includes('fecha')) {
        valor = '2026-12-31'
      } else if (typeLower === 'time' || idLower.includes('hora')) {
        valor = '12:00'
      } else if (typeLower === 'number' || idLower.includes('monto') || idLower.includes('cant')) {
        valor = '10'
      }

      fireEvent.change(input, { target: { value: valor } })
    })

    // 4. Llenar campo de detalle (textarea)
    const textareas = container.querySelectorAll('textarea')
    textareas.forEach((ta) => {
      fireEvent.change(ta, { target: { value: 'Detalle de prueba para la solicitud con suficiente longitud' } })
    })

    // 5. Seleccionar una opción no vacía en cada <select>
    const selects = container.querySelectorAll('select')
    selects.forEach((select) => {
      const opcionValida = Array.from(select.options).find(
        (opt) => opt.value && opt.value.trim() !== ''
      )
      if (opcionValida) {
        fireEvent.change(select, { target: { value: opcionValida.value } })
      }
    })

    // 6. Enviar formulario
    const formulario = container.querySelector('form')
    if (formulario) {
      fireEvent.submit(formulario)
    }

    expect(window.alert).toHaveBeenCalled()
  })
})