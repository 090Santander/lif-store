import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Contacto from './Contacto'
import { AuthProvider } from '../context/AuthContext'
import { CarritoProvider } from '../context/CarritoContext'

describe('Página Contacto (Contacto.spec.tsx)', () => {
  beforeEach(() => {
    localStorage.clear()
    spyOn(window, 'alert').and.stub()
  })

  afterEach(() => {
    cleanup()
  })

  const renderContacto = () =>
    render(
      <AuthProvider>
        <CarritoProvider>
          <MemoryRouter>
            <Contacto />
          </MemoryRouter>
        </CarritoProvider>
      </AuthProvider>
    )

  it('debe renderizar la información de contacto y la organización', () => {
    renderContacto()

    expect(screen.getByText(/Nosotros y Contacto/i)).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: /Nuestra Organización/i })
    ).toBeTruthy()
    expect(screen.getByText(/Datos de Contacto Directo/i)).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Pasión' })).toBeTruthy()
  })

  it('debe permitir actualizar los campos del formulario y enviarlo con éxito', () => {
    const { container } = renderContacto()

    const inputNombre = container.querySelector('#c-nombre')
    const inputCorreo = container.querySelector('#c-correo')
    const inputTelefono = container.querySelector('#c-telefono')
    const selectMotivo = container.querySelector('#c-motivo')
    const inputMensaje = container.querySelector('#c-mensaje')

    if (inputNombre)
      fireEvent.change(inputNombre, { target: { value: 'Juan Pérez' } })
    if (inputCorreo)
      fireEvent.change(inputCorreo, { target: { value: 'juan@correo.com' } })
    if (inputTelefono)
      fireEvent.change(inputTelefono, { target: { value: '+56 9 8765 4321' } })
    if (selectMotivo)
      fireEvent.change(selectMotivo, {
        target: { value: 'Soporte de Entradas' },
      })
    if (inputMensaje)
      fireEvent.change(inputMensaje, {
        target: { value: 'Consulta sobre el fixture' },
      })

    const form = container.querySelector('form')
    if (form) {
      fireEvent.submit(form)
      expect(window.alert).toHaveBeenCalledWith('Mensaje enviado con éxito')
    }
  })
})