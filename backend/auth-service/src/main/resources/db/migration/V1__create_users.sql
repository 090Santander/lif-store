CREATE TABLE usuarios (
    id BIGINT NOT NULL AUTO_INCREMENT,
    run VARCHAR(9),
    correo VARCHAR(254) NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    apellidos VARCHAR(120) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    rol VARCHAR(16) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP(6) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_usuarios_run UNIQUE (run),
    CONSTRAINT uk_usuarios_correo UNIQUE (correo)
);
