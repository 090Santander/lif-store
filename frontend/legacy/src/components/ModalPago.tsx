import { useState } from 'react'

interface ModalPagoProps {
  onConfirmar: (metodo: string) => void
  onCerrar: () => void
}

const metodos = [
  { valor: 'webpay', titulo: 'Webpay Plus', detalle: 'Tarjeta de Crédito, Débito o Prepago' },
  { valor: 'transferencia', titulo: 'Transferencia Bancaria', detalle: 'Transferencia directa desde tu banco' },
]

export default function ModalPago({ onConfirmar, onCerrar }: ModalPagoProps) {
  const [metodo, setMetodo] = useState('webpay')

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" onClick={onCerrar}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content rounded-4 border-0 shadow">
            <div className="modal-header bg-dark-green text-white border-0 rounded-top-4">
              <h5 className="modal-title fw-bold">💳 Método de Pago</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={onCerrar}></button>
            </div>

            <div className="modal-body p-4">
              <p className="text-body-secondary small mb-3">Selecciona cómo deseas pagar tus entradas:</p>

              <div className="list-group mb-4 border-0 gap-2">
                {metodos.map((m) => (
                  <label
                    key={m.valor}
                    className={`list-group-item d-flex gap-3 align-items-center p-3 rounded-4 shadow-sm border ${
                      metodo === m.valor ? 'border-success bg-body-tertiary' : ''
                    }`}
                    style={{ cursor: 'pointer' }}
                  >
                    <input
                      className="form-check-input flex-shrink-0 fs-4 mt-0"
                      type="radio"
                      name="metodoPago"
                      value={m.valor}
                      checked={metodo === m.valor}
                      onChange={() => setMetodo(m.valor)}
                    />
                    <div>
                      <h6 className="mb-0 fw-bold text-body">{m.titulo}</h6>
                      <small className="text-body-secondary">{m.detalle}</small>
                    </div>
                  </label>
                ))}
              </div>

              <button type="button" className="btn btn-success w-100 rounded-pill fw-bold" onClick={() => onConfirmar(metodo)}>
                Confirmar y Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}