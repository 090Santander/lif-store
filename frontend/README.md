# Frontend · LIF Store

Aplicación web de la Liga Independiente de Fútbol. Está construida con React, TypeScript y Vite; utiliza el API Gateway del backend para autenticación, contenido, solicitudes y órdenes de entradas.

[README principal](../README.md) · [Guía del backend](../backend/README.md)

## Funcionalidades

- Portada con información de la liga, partidos y noticias.
- Consulta de partidos, tabla de posiciones, jugadores, actas y complejos deportivos.
- Registro, inicio de sesión y perfil de usuario.
- Carrito persistente en el navegador y creación de órdenes de entradas.
- Envío y seguimiento de solicitudes.
- Área de administración para gestionar contenido y revisar solicitudes.

El frontend crea órdenes en el backend, pero el proyecto no integra un proveedor de pago. Una orden queda pendiente y no se realiza ningún cobro.

## Tecnologías

- React 19 y TypeScript 6.
- Vite 8 para desarrollo y compilación.
- React Router para navegación.
- Bootstrap 5 para estilos y componentes de interfaz.
- Karma y Jasmine para pruebas de componentes y utilidades.

## Requisitos

- Node.js `20.19+` o `22.12+`.
- npm, incluido con Node.js.
- Backend de LIF Store iniciado para utilizar autenticación y datos de la API.

## Instalación y configuración

Desde la raíz del repositorio, crea la configuración de Vite.

PowerShell:

```powershell
Copy-Item frontend/lif-store-react/.env.example frontend/lif-store-react/.env.local
```

Linux:

```bash
cp frontend/lif-store-react/.env.example frontend/lif-store-react/.env.local
```

La variable `VITE_API_URL` define la URL base del backend. Su valor por defecto es:

```env
VITE_API_URL=http://localhost:8080/api
```

Si el API Gateway está en otra dirección, actualiza `VITE_API_URL` en `frontend/lif-store-react/.env.local` y reinicia Vite. Este archivo local está excluido de Git.

Instala las dependencias desde la aplicación React:

```bash
cd frontend/lif-store-react
npm ci
```

## Comandos

Ejecuta los comandos desde `frontend/lif-store-react`:

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run build` | Ejecuta la comprobación TypeScript y genera `dist/`. |
| `npm run preview` | Sirve localmente la compilación de `dist/`. |
| `npm run test` | Ejecuta las pruebas con Karma y Jasmine y genera cobertura. |

En Windows, abre PowerShell en la carpeta indicada y ejecuta los mismos comandos `npm`.

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abre <http://localhost:5173>. El servidor normalmente actualiza la página al guardar cambios.

## Pruebas

El proyecto incluye pruebas de páginas, componentes, contextos y utilidades. Para ejecutarlas:

```bash
npm run test
```

Karma ejecuta Jasmine en Chrome Headless y escribe el informe de cobertura dentro de `coverage/`. Si Chrome o Chromium no se detecta automáticamente, configura `CHROME_BIN` con la ruta del navegador antes de ejecutar el comando.

PowerShell:

```powershell
$env:CHROME_BIN = "C:\Program Files\Google\Chrome\Application\chrome.exe"
npm run test
```

Linux:

```bash
export CHROME_BIN=/usr/bin/chromium
npm run test
```

## Páginas principales

| Ruta | Página |
|---|---|
| `/` | Portada |
| `/partidos` | Calendario de partidos |
| `/posiciones` | Tabla de posiciones |
| `/noticias` | Noticias de la liga |
| `/jugadores` | Jugadores y estadísticas |
| `/entradas` | Entradas disponibles |
| `/carrito` | Revisión y creación de una orden |
| `/solicitudes` | Crear y consultar solicitudes |
| `/mis-entradas` | Órdenes de entradas del usuario |
| `/perfil` | Perfil de la cuenta |
| `/admin` | Administración, requiere rol `ADMIN` |

También están disponibles las páginas `/actas`, `/complejos`, `/contacto`, `/login` y `/registro`.

## Estructura del código

```text
frontend/lif-store-react/
  src/
    api/          Cliente HTTP y manejo de errores de API
    components/   Componentes reutilizables y administrativos
    context/      Sesión y carrito
    data/         Tipos y datos del dominio
    hooks/        Hooks de acceso y gestión de colecciones
    pages/        Páginas asociadas a las rutas
    utils/        Validaciones y funciones compartidas
  package.json    Dependencias y scripts
  vite.config.ts  Configuración de Vite
```

El cliente HTTP agrega el token JWT en las solicitudes autenticadas. El token y el carrito se guardan en `localStorage` del navegador. Los endpoints protegidos requieren una sesión válida; la autorización de administrador también se verifica en el backend.

## Integración con el backend

Levanta primero el backend desde la raíz del repositorio:

```bash
docker compose --env-file backend/.env -f backend/docker-compose.yml up --build -d
```

Después inicia Vite en otra terminal. El frontend apunta por defecto a `http://localhost:8080/api`; la guía completa de servicios, credenciales y API está en [backend/README.md](../backend/README.md).

## Publicación en GitHub Pages

El workflow del repositorio compila esta aplicación con base `/lif-store/` y publica `dist/` en <https://090santander.github.io/lif-store/> al actualizar la rama `main`. En **Settings → Pages**, el origen debe ser **GitHub Actions**. Para conectar el sitio publicado al backend, configura la variable de Actions `VITE_API_URL` con la URL HTTPS pública del API Gateway, incluyendo `/api`, y permite el origen `https://090santander.github.io` en CORS. GitHub Pages no publica el backend.

## Aplicación anterior

El código previo se conserva en `frontend/legacy/`. La aplicación activa es `frontend/lif-store-react/`.

---

[README principal](../README.md) · [Guía del backend](../backend/README.md)
