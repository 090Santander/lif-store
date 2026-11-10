-- Datos ficticios para desarrollo local. Ejecutar después de las migraciones.
-- Se pueden cargar varias veces sin duplicar los registros de ejemplo.
USE lif_liga;
SET NAMES utf8mb4;
START TRANSACTION;

INSERT INTO partidos (equipo_local, equipo_visitante, fecha, hora, sede, fase, precio, descripcion, estado)
SELECT 'Deportivo Norte', 'Unión Sur', DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), '%Y-%m-%d'),
       '16:00', 'Complejo Central', 'Liga Regular', 5000, 'Partido de demostración para probar la compra de entradas.', 'Programado'
WHERE NOT EXISTS (SELECT 1 FROM partidos WHERE equipo_local = 'Deportivo Norte' AND equipo_visitante = 'Unión Sur');

INSERT INTO partidos (equipo_local, equipo_visitante, fecha, hora, sede, fase, precio, descripcion, estado)
SELECT 'Atlético Cordillera', 'Estrella del Valle', DATE_FORMAT(DATE_ADD(CURRENT_DATE, INTERVAL 8 DAY), '%Y-%m-%d'),
       '12:00', 'Cancha Los Aromos', 'Jornada Familiar', 0, 'Partido gratuito de demostración.', 'Programado'
WHERE NOT EXISTS (SELECT 1 FROM partidos WHERE equipo_local = 'Atlético Cordillera' AND equipo_visitante = 'Estrella del Valle');

INSERT INTO partidos (equipo_local, equipo_visitante, fecha, hora, sede, fase, precio, descripcion, estado, goles_local, goles_visita)
SELECT 'Unión Sur', 'Atlético Cordillera', DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY), '%Y-%m-%d'),
       '16:00', 'Complejo Central', 'Liga Regular', 5000, 'Resultado de demostración; no disponible para entradas.', 'Finalizado', 2, 1
WHERE NOT EXISTS (SELECT 1 FROM partidos WHERE equipo_local = 'Unión Sur' AND equipo_visitante = 'Atlético Cordillera');

INSERT INTO noticias (titulo, categoria, fecha, resumen, destacada)
SELECT 'Bienvenidos a la temporada de demostración', 'Oficial', DATE_FORMAT(CURRENT_DATE, '%Y-%m-%d'),
       'Datos ficticios para explorar la liga, consultar partidos y crear órdenes de entradas pendientes de pago.', TRUE
WHERE NOT EXISTS (SELECT 1 FROM noticias WHERE titulo = 'Bienvenidos a la temporada de demostración');

INSERT INTO noticias (titulo, categoria, fecha, resumen, destacada)
SELECT 'Jornada familiar con entrada gratuita', 'Deportes', DATE_FORMAT(CURRENT_DATE, '%Y-%m-%d'),
       'Atlético Cordillera y Estrella del Valle disputarán el encuentro gratuito de demostración en Cancha Los Aromos.', FALSE
WHERE NOT EXISTS (SELECT 1 FROM noticias WHERE titulo = 'Jornada familiar con entrada gratuita');

INSERT INTO jugadores (nombre, equipo, posicion, dorsal, pj, goles, ta, tr)
SELECT 'Tomás Demo', 'Deportivo Norte', 'Delantero', '9', 4, 3, 1, 0
WHERE NOT EXISTS (SELECT 1 FROM jugadores WHERE nombre = 'Tomás Demo' AND equipo = 'Deportivo Norte');

INSERT INTO jugadores (nombre, equipo, posicion, dorsal, pj, goles, ta, tr)
SELECT 'Diego Ejemplo', 'Unión Sur', 'Mediocampista', '10', 4, 2, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM jugadores WHERE nombre = 'Diego Ejemplo' AND equipo = 'Unión Sur');

INSERT INTO jugadores (nombre, equipo, posicion, dorsal, pj, goles, ta, tr)
SELECT 'Martín Prueba', 'Atlético Cordillera', 'Portero', '1', 4, 0, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM jugadores WHERE nombre = 'Martín Prueba' AND equipo = 'Atlético Cordillera');

COMMIT;
