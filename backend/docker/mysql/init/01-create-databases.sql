CREATE DATABASE IF NOT EXISTS lif_liga CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE DATABASE IF NOT EXISTS lif_solicitudes CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE DATABASE IF NOT EXISTS lif_entradas CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

GRANT ALL PRIVILEGES ON lif_usuarios.* TO 'lif_app'@'%';
GRANT ALL PRIVILEGES ON lif_liga.* TO 'lif_app'@'%';
GRANT ALL PRIVILEGES ON lif_solicitudes.* TO 'lif_app'@'%';
GRANT ALL PRIVILEGES ON lif_entradas.* TO 'lif_app'@'%';
FLUSH PRIVILEGES;
