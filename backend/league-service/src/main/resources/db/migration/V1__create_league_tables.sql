CREATE TABLE partidos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    equipo_local VARCHAR(100) NOT NULL,
    equipo_visitante VARCHAR(100) NOT NULL,
    fecha VARCHAR(20) NOT NULL,
    hora VARCHAR(20) NOT NULL,
    sede VARCHAR(120) NOT NULL,
    fase VARCHAR(80) NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    descripcion VARCHAR(1000),
    estado VARCHAR(40) NOT NULL,
    goles_local INT,
    goles_visita INT,
    PRIMARY KEY (id)
);

CREATE TABLE noticias (
    id BIGINT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(180) NOT NULL,
    categoria VARCHAR(60) NOT NULL,
    fecha VARCHAR(80) NOT NULL,
    resumen VARCHAR(2000) NOT NULL,
    destacada BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE jugadores (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    equipo VARCHAR(100) NOT NULL,
    posicion VARCHAR(40) NOT NULL,
    dorsal VARCHAR(3) NOT NULL,
    pj INT NOT NULL DEFAULT 0,
    goles INT NOT NULL DEFAULT 0,
    ta INT NOT NULL DEFAULT 0,
    tr INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);
