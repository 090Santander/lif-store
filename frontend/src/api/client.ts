const API_BASE_URL = (
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8080/api' : '')
).replace(/\/$/, '')
const ACCESS_TOKEN_KEY = 'lif_access_token'

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

export function obtenerToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function guardarToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function borrarToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  requiereAutenticacion = true,
): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError('La API no está configurada para esta publicación. Define VITE_API_URL para habilitar esta función.', 0)
  }

  const headers = new Headers(options.headers)
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

  const token = requiereAutenticacion ? obtenerToken() : null
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  } catch {
    throw new ApiError('No se pudo conectar con el backend. Comprueba que el API Gateway esté iniciado.', 0)
  }

  if (response.status === 204) return undefined as T

  const contentType = response.headers.get('content-type') ?? ''
  const payload: unknown = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload !== null && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : `La solicitud falló (${response.status}).`

    if (response.status === 401 && requiereAutenticacion) {
      borrarToken()
      window.dispatchEvent(new Event('lif:unauthorized'))
    }

    throw new ApiError(message, response.status)
  }

  return payload as T
}

export function apiGet<T>(path: string): Promise<T> {
  return apiRequest<T>(path)
}

export function apiPost<T>(path: string, body: unknown, requiereAutenticacion = true): Promise<T> {
  return apiRequest<T>(path, { method: 'POST', body: JSON.stringify(body) }, requiereAutenticacion)
}

export function apiPut<T>(path: string, body: unknown): Promise<T> {
  return apiRequest<T>(path, { method: 'PUT', body: JSON.stringify(body) })
}

export function apiPatch<T>(path: string, body: unknown): Promise<T> {
  return apiRequest<T>(path, { method: 'PATCH', body: JSON.stringify(body) })
}

export function apiDelete(path: string): Promise<void> {
  return apiRequest<void>(path, { method: 'DELETE' })
}

export function mensajeApi(error: unknown): string {
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado.'
}
