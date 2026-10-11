export default function Pendiente({ titulo }: { titulo: string }) {
  return (
    <div className="container py-5 text-center">
      <h2 className="fw-bold">{titulo}</h2>
      <p className="text-muted">Página pendiente de migración.</p>
    </div>
  )
}