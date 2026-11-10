# Datos de demostración

Después de iniciar los servicios y completar las migraciones, ejecuta desde la raíz del repositorio:

```bash
docker compose --env-file backend/.env -f backend/docker-compose.yml exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" mysql --default-character-set=utf8mb4 -u lif_app' < backend/docker/mysql/demo.sql
```

El script agrega tres partidos, dos noticias y tres jugadores ficticios. Incluye un partido gratuito y uno finalizado para comprobar las restricciones de venta. No reemplaza registros existentes y evita duplicar sus ejemplos al ejecutarlo nuevamente. Las fechas se calculan al cargar los datos por primera vez.

La carga es opcional y está destinada al desarrollo local. No se ejecuta automáticamente durante el arranque ni modifica usuarios o contraseñas.
