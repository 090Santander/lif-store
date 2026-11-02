interface CampoSelectProps {
  id: string
  etiqueta: string
  value: string
  opciones: string[]
  onChange: (valor: string) => void
}

export default function CampoSelect({ id, etiqueta, value, opciones, onChange }: CampoSelectProps) {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label small fw-bold">
        {etiqueta}
      </label>
      <select id={id} className="form-select" required value={value} onChange={(e) => onChange(e.target.value)}>
        {opciones.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}