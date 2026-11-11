interface CampoProps {
  id: string
  etiqueta: string
  value: string
  onChange: (valor: string) => void
  type?: string
  required?: boolean
  min?: number
  max?: number
  maxLength?: number
  placeholder?: string
  filas?: number // si se indica, se dibuja un <textarea>
  error?: string
}

export default function Campo({
  id, etiqueta, value, onChange, type = 'text', required = true,
  min, max, maxLength, placeholder, filas, error,
}: CampoProps) {
  const clases = `form-control${error ? ' is-invalid' : ''}`

  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label small fw-bold">
        {etiqueta}
      </label>
      {filas ? (
        <textarea
          id={id}
          className={clases}
          rows={filas}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          type={type}
          className={clases}
          value={value}
          required={required}
          min={min}
          max={max}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && <div className="text-danger extra-small mt-1">{error}</div>}
    </div>
  )
}