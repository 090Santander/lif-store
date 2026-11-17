# LIF Store: inicio en Windows

## Una sola vez

Instala Git, Node.js LTS (22.12+ o posterior compatible) y
[Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/).
Activa el backend WSL 2 y los contenedores Linux. Abre Docker Desktop y espera
hasta que el motor este listo.

Clona el repositorio:

```powershell
git clone https://github.com/090Santander/lif-store.git
cd lif-store
```

## Iniciar frontend y backend

Haz doble clic en **iniciar-windows.cmd**, dentro de `lif-store`. Tambien puedes
abrir una terminal en esa carpeta y ejecutar:

```powershell
.\iniciar-windows.cmd
```

El iniciador:

1. Comprueba Node.js, Docker y Compose v2.
2. Si falta `backend/.env`, lo crea con contrasenas y JWT aleatorios para tu equipo.
3. Conserva cualquier `.env` existente y crea la configuracion local del frontend si falta.
4. Compila e inicia el backend y espera hasta que sus servicios respondan `UP`.
5. Instala dependencias del frontend si faltan o cambio `package-lock.json`.
6. Inicia Vite en el puerto 5173.

Cuando Vite indique `ready`, abre <http://localhost:5173/#/login>. El correo y
la contrasena del administrador estan en `backend/.env`, en `LIF_ADMIN_EMAIL`
y `LIF_ADMIN_PASSWORD`. En una instalacion nueva el correo es `admin@lif.local`;
la contrasena es aleatoria. No subas ni compartas ese archivo.

La primera compilacion necesita Internet y puede tardar varios minutos. Los
siguientes arranques reutilizan las capas de Docker y las dependencias npm.
El comando mantiene una ventana abierta con el frontend; no la cierres mientras
uses la aplicacion. Ctrl+C detiene Vite. Los contenedores siguen ejecutandose.

## Detener el backend conservando los datos

Desde la raiz de `lif-store`:

```powershell
docker compose -p lif-semestral --env-file backend/.env -f backend/docker-compose.yml stop
```

## Problemas habituales

- **Docker no esta listo:** abre Docker Desktop y vuelve a ejecutar el iniciador.
- **Puerto 5173 ocupado:** cierra la otra instancia de Vite; el script evita saltar a otro puerto para mantener CORS correcto.
- **Puerto 8080, 8081-8084 o 8761 ocupado:** consulta `docker ps` y detiene la copia anterior del mismo proyecto. No elimines volumenes.
- **MySQL unhealthy:** si el volumen ya existia, conserva las contrasenas originales. Cambiar `.env` no actualiza las guardadas en MySQL.
- **API sin responder:** el iniciador espera hasta tres minutos. Consulta estado y registros con los comandos siguientes.
- **npm bloqueado por PowerShell:** el iniciador usa `npm.cmd`, por lo que no necesita habilitar `npm.ps1`.

```powershell
docker compose -p lif-semestral --env-file backend/.env -f backend/docker-compose.yml ps
docker compose -p lif-semestral --env-file backend/.env -f backend/docker-compose.yml logs --tail 80 api-gateway auth-service league-service
```

Para reinstalar dependencias expresamente:

```powershell
.\iniciar-windows.cmd -InstalarDependencias
```

El lanzador aplica `ExecutionPolicy Bypass` solamente al proceso que ejecuta el
script; no cambia la politica permanente de Windows. Las politicas de una
organizacion pueden impedirlo. Consulta [Microsoft](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_powershell_exe).

Este arranque es para desarrollo local. GitHub Pages es otra publicacion y
necesita una API publica; consulta [GITHUB-PAGES.md](GITHUB-PAGES.md).
