interface ModalPagoProps {
  onConfirmar: () => void
  onCerrar: () => void
  enviando?: boolean
}

export default function ModalPago({ onConfirmar, onCerrar, enviando = false }: ModalPagoProps) {
  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" onClick={onCerrar}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content rounded-4 border-0 shadow">
            <div className="modal-header bg-dark-green text-white border-0 rounded-top-4">
              <h5 className="modal-title fw-bold">🎟️ Confirmar orden</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={onCerrar}></button>
            </div>

            <div className="modal-body p-4">
              <div className="alert alert-info small" role="status">
                Se creará una orden en estado pendiente de pago. El pago en línea aún no está habilitado y no se realizará ningún cobro.
              </div>

              <button type="button" disabled={enviando} className="btn btn-success w-100 rounded-pill fw-bold" onClick={onConfirmar}>
                {enviando ? 'Creando orden…' : 'Confirmar creación de orden'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}
