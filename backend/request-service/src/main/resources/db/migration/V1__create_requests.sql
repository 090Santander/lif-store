CREATE TABLE solicitudes (
    id BIGINT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(32) NOT NULL,
    datos JSON NOT NULL,
    detalle VARCHAR(3000) NOT NULL,
    solicitante VARCHAR(254) NOT NULL,
    nombre_solicitante VARCHAR(200) NOT NULL,
    fecha TIMESTAMP(6) NOT NULL,
    estado VARCHAR(16) NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_solicitudes_solicitante_fecha (solicitante, fecha),
    INDEX idx_solicitudes_estado (estado)
);
