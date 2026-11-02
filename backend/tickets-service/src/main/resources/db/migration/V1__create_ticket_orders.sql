CREATE TABLE ordenes_entradas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    solicitante VARCHAR(254) NOT NULL,
    nombre_solicitante VARCHAR(200) NOT NULL,
    creado_en TIMESTAMP(6) NOT NULL,
    estado VARCHAR(24) NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_ordenes_solicitante_fecha (solicitante, creado_en)
);

CREATE TABLE entradas_orden (
    id BIGINT NOT NULL AUTO_INCREMENT,
    orden_id BIGINT NOT NULL,
    partido_id BIGINT NOT NULL,
    encuentro VARCHAR(220) NOT NULL,
    fecha_partido VARCHAR(40) NOT NULL,
    sede VARCHAR(120) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_entradas_orden FOREIGN KEY (orden_id) REFERENCES ordenes_entradas (id) ON DELETE CASCADE
);
