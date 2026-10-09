import { useState } from 'react'
import { formatearPesos } from '../utils/formato'

interface ModalPagoProps {
  total: number
  onConfirmar: (metodo: string) => void
  onCerrar: () => void
}


const metodos = [
  { valor: 'webpay', texto: 'Webpay Plus (tarjeta)' },
  { valor: 'transferencia', texto: 'Transferencia bancaria' },
  { valor: 'mach', texto: 'MACH' },
]

export default function ModalPago({ total, onConfirmar, onCerrar }: ModalPagoProps) {
  const [metodo, setMetodo] = useState('webpay')

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Método de pago</h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar}></button>
            </div>
            <div className="modal-body">
              <p className="small text-body-secondary">
                Total a pagar: <strong className="text-success">{formatearPesos(total)}</strong>
              </p>
              {metodos.map((m) => (
                <div className="form-check mb-2" key={m.valor}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="metodoPago"
                    id={`pago-${m.valor}`}
                    value={m.valor}
                    checked={metodo === m.valor}
                    onChange={() => setMetodo(m.valor)}
                  />
                  <label className="form-check-label" htmlFor={`pago-${m.valor}`}>
                    {m.texto}
                  </label>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCerrar}>
                Cancelar
              </button>
              <button type="button" className="btn btn-success fw-bold" onClick={() => onConfirmar(metodo)}>
                Confirmar pago
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}