# LIF Store

Plataforma web para la Liga Independiente de Fútbol. El repositorio incluye un frontend React y un backend Spring Boot modular que administra usuarios, partidos, noticias, jugadores, solicitudes y órdenes de entradas.

## Estructura

    backend/
      api-gateway/       # API pública en el puerto 8080
      auth-service/      # Usuarios y autenticación
      league-service/    # Partidos, noticias y jugadores
      request-service/   # Solicitudes
      tickets-service/   # Órdenes de entradas
      eureka-server/     # Descubrimiento de servicios
      shared/            # Seguridad y manejo común de errores
    frontend/
      lif-store-react/   # Aplicación React activa
      legacy/            # Fuentes anteriores preservadas

Cada servicio de negocio sigue las capas controller, service, repository, model y dto. Los datos se guardan en MySQL y Flyway administra las migraciones.

## Requisitos

- Git.
- Docker Desktop con Docker Compose v2 en Windows, o Docker Engine y el plugin Docker Compose v2 en Linux.
- Node.js 20.19+ o 22.12+ y npm para el frontend.
- Java 21 solo si vas a compilar o ejecutar servicios fuera de Docker. El modo Docker no requiere instalar Java ni Maven en el equipo.

- **Windows:** inicia Docker Desktop antes de continuar y usa contenedores Linux (WSL 2 recomendado).
- **Linux:** inicia el servicio Docker y confirma que tu usuario tenga permiso para ejecutar docker.

La primera ejecución necesita conexión a Internet para descargar imágenes y dependencias.

## Puesta en marcha

Ejecuta los pasos desde la raíz del repositorio, donde están las carpetas backend y frontend.

### 1. Clonar el repositorio

    git clone https://github.com/090Santander/lif-store.git
    cd lif-store

### 2. Crear los archivos de entorno

En PowerShell:

    Copy-Item backend/.env.example backend/.env
    Copy-Item frontend/lif-store-react/.env.example frontend/lif-store-react/.env.local

En Linux:

    cp backend/.env.example backend/.env
    cp frontend/lif-store-react/.env.example frontend/lif-store-react/.env.local

Edita backend/.env y reemplaza las claves de ejemplo, al menos:

- MYSQL_ROOT_PASSWORD y LIF_DB_PASSWORD con contraseñas locales.
- JWT_SECRET con una clave aleatoria de al menos 32 bytes.
- LIF_ADMIN_EMAIL y LIF_ADMIN_PASSWORD con las credenciales del administrador local.

No subas los archivos .env al repositorio. El archivo .env.local del frontend usa por defecto http://localhost:8080/api.

### 3. Iniciar el backend

Desde la raíz del repositorio, el mismo comando funciona en PowerShell y Linux:

    docker compose --env-file backend/.env -f backend/docker-compose.yml up --build -d

La primera compilación puede tardar varios minutos. Comprueba el estado de los servicios:

    docker compose --env-file backend/.env -f backend/docker-compose.yml ps

### 4. Iniciar el frontend

En una segunda terminal, desde la raíz del repositorio:

    cd frontend/lif-store-react
    npm ci
    npm run dev

Abre http://localhost:5173. El administrador inicial usa el correo y la contraseña definidos en LIF_ADMIN_EMAIL y LIF_ADMIN_PASSWORD.

## Servicios y documentación API

| Componente | URL local |
|---|---|
| Frontend | http://localhost:5173 |
| API Gateway | http://localhost:8080/api |
| Eureka | http://localhost:8761 |
| Swagger de autenticación | http://localhost:8081/swagger-ui.html |
| Swagger de liga | http://localhost:8082/swagger-ui.html |
| Swagger de solicitudes | http://localhost:8083/swagger-ui.html |
| Swagger de entradas | http://localhost:8084/swagger-ui.html |

La API usa JWT Bearer. El registro valida el RUN chileno con módulo 11; las operaciones administrativas requieren el rol ADMIN. Los precios de las entradas se consultan desde el backend.

Las órdenes de compra quedan en estado PENDIENTE_PAGO. El proyecto todavía no integra un proveedor de pagos, por lo que no realiza cobros ni emite entradas pagadas.

## Comandos útiles

Ejecuta estos comandos desde frontend/lif-store-react:

    npm run dev       # servidor de desarrollo
    npm run build     # compilación de producción
    npm run lint      # revisión estática

Para ver logs del backend desde la raíz del repositorio:

    docker compose --env-file backend/.env -f backend/docker-compose.yml logs -f api-gateway

Detener los contenedores y conservar la base de datos:

    docker compose --env-file backend/.env -f backend/docker-compose.yml down

Para borrar también los datos locales de MySQL, añade -v a down. Esa acción elimina las órdenes y usuarios locales guardados en el volumen.

## Solución de problemas

- **No se puede conectar con Docker:** inicia Docker Desktop en Windows o el servicio Docker en Linux; verifica con docker compose version.
- **El puerto ya está en uso:** libera los puertos 3306, 5173, 8080–8084 y 8761, o cambia las asignaciones en backend/docker-compose.yml.
- **El frontend muestra error de conexión:** espera a que los servicios terminen de iniciar y revisa los logs con el comando anterior. Confirma que VITE_API_URL apunte a http://localhost:8080/api.
- **Cambiaste dependencias del frontend:** vuelve a ejecutar npm ci desde frontend/lif-store-react.

Para levantar un servicio Spring Boot desde el IDE se requiere Java 21 y configurar las variables de base de datos, Eureka y JWT descritas en backend/README.md.
