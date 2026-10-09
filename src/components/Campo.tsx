interface CampoProps {
  id: string
  etiqueta: string
  value: string
  onChange: (valor: string) => void
  type?: string
  required?: boolean
  min?: number
}

export default function Campo({
  id,
  etiqueta,
  value,
  onChange,
  type = 'text',
  required = true,
  min,
}: CampoProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold small">
        {etiqueta}
      </label>
      <input
        id={id}
        type={type}
        className="form-control"
        value={value}
        required={required}
        min={min}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}