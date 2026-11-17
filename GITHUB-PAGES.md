# Publicar el frontend en GitHub Pages

La pagina del proyecto es <https://090santander.github.io/lif-store/>.
Con HashRouter, el enlace de inicio de sesion es
<https://090santander.github.io/lif-store/#/login>.

## Configurar GitHub

1. Sube los cambios del workflow a `main`.
2. En **Settings → Pages → Build and deployment**, selecciona **GitHub Actions**.
3. En **Actions → Deploy GitHub Pages**, revisa el resultado de la ejecucion.
4. Si necesitas repetirla, usa **Run workflow**.

El workflow usa la carpeta real `frontend` para instalar, compilar y publicar
`frontend/dist`. La ruta base procede de `actions/configure-pages`, por lo que
los recursos se cargan bajo `/lif-store/` y el enrutador usa enlaces con `#/`.

## Inicio de sesion y datos reales

Pages publica HTML, CSS y JavaScript. No ejecuta Docker, Java ni MySQL.
`https://090santander.github.io/lif-store/` es la direccion del frontend;
no es una URL del backend.

Para habilitar las funciones de API necesitas desplegar el API Gateway y sus
servicios en un servidor accesible mediante HTTPS. Despues:

- En **Settings → Secrets and variables → Actions → Variables**, crea
  `VITE_API_URL` con la URL HTTPS real del Gateway, incluyendo `/api`.
- En el backend configura `CORS_ALLOWED_ORIGINS` para incluir
  `https://090santander.github.io` (el origen no lleva `/lif-store/`).
- Reconstruye/reinicia el backend segun su despliegue y vuelve a ejecutar el
  workflow de Pages, porque Vite incorpora la URL durante la compilacion.

`VITE_API_URL` es publica y se incluye en el JavaScript; no pongas contrasenas,
tokens privados ni claves JWT ahi. Las credenciales de MySQL y JWT pertenecen
al servidor. No subas `.env` al repositorio.

Si todavia ejecutas el backend solamente en tu PC, Pages puede cargar la
interfaz, pero no se confirma acceso publico a login o datos. El workflow
muestra un aviso cuando falta la URL. Si recibe HTTP, localhost o una IP privada,
el validador lo rechaza para evitar una publicacion que no pueda conectarse
correctamente desde Internet.

## Comprobar la compilacion local

En PowerShell, desde `frontend`:

```powershell
npm ci
$env:VITE_BASE_PATH = '/lif-store/'
npm run build
npm run preview
```

Abre la direccion que indica Vite con `/lif-store/` al final. Los recursos
compilados deben apuntar a esa misma base. El archivo `.env.local` de tu PC
puede configurar una API local durante estas pruebas; no se sube a Actions.

La compilacion local no confirma permisos, variables del repositorio o el
resultado de GitHub Actions. Esas comprobaciones se hacen despues del push.

Referencias: [Vite: despliegue estatico](https://vite.dev/guide/static-deploy),
[GitHub Pages: limites y alcance](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
