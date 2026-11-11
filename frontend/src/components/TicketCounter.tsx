interface TicketCounterProps {
  cantidad: number
  onIncrementar: () => void
  onDecrementar: () => void
}

export default function TicketCounter({
  cantidad,
  onIncrementar,
  onDecrementar,
}: TicketCounterProps) {
  return (
    <div className="d-flex align-items-center gap-2">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm rounded-circle"
        onClick={onDecrementar}
        disabled={cantidad <= 1}
      >
        -
      </button>
      <span className="fw-bold px-2">{cantidad}</span>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm rounded-circle"
        onClick={onIncrementar}
      >
        +
      </button>
    </div>
  )
}