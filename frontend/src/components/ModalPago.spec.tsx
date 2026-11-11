import { render, screen, fireEvent } from '@testing-library/react'
import ModalPago from './ModalPago'

describe('ModalPago Component', () => {
  it('debe renderizar el modal con los métodos de pago', () => {
    const onConfirmarSpy = jasmine.createSpy('onConfirmar')
    const onCerrarSpy = jasmine.createSpy('onCerrar')

    render(<ModalPago onConfirmar={onConfirmarSpy} onCerrar={onCerrarSpy} />)

    expect(screen.getByText(/Método de Pago/i)).toBeTruthy()
    expect(screen.getByText('Webpay Plus')).toBeTruthy()
    expect(screen.getByText('Transferencia Bancaria')).toBeTruthy()
  })

  it('debe seleccionar por defecto Webpay y confirmar el pago', () => {
    const onConfirmarSpy = jasmine.createSpy('onConfirmar')
    const onCerrarSpy = jasmine.createSpy('onCerrar')

    render(<ModalPago onConfirmar={onConfirmarSpy} onCerrar={onCerrarSpy} />)

    const btnPagar = screen.getByRole('button', { name: /Confirmar y Pagar/i })
    fireEvent.click(btnPagar)

    expect(onConfirmarSpy).toHaveBeenCalledWith('webpay')
  })

  it('debe permitir cambiar a Transferencia Bancaria y confirmar', () => {
    const onConfirmarSpy = jasmine.createSpy('onConfirmar')
    const onCerrarSpy = jasmine.createSpy('onCerrar')

    render(<ModalPago onConfirmar={onConfirmarSpy} onCerrar={onCerrarSpy} />)

    const opcionTransferencia = screen.getByText('Transferencia Bancaria')
    fireEvent.click(opcionTransferencia)

    const btnPagar = screen.getByRole('button', { name: /Confirmar y Pagar/i })
    fireEvent.click(btnPagar)

    expect(onConfirmarSpy).toHaveBeenCalledWith('transferencia')
  })

  it('debe llamar a la función onCerrar al hacer clic en el botón de cierre', () => {
    const onConfirmarSpy = jasmine.createSpy('onConfirmar')
    const onCerrarSpy = jasmine.createSpy('onCerrar')

    render(<ModalPago onConfirmar={onConfirmarSpy} onCerrar={onCerrarSpy} />)

    const btnCerrar = screen.getByLabelText('Cerrar')
    fireEvent.click(btnCerrar)

    expect(onCerrarSpy).toHaveBeenCalled()
  })
})