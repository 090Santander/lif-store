ALTER TABLE ordenes_entradas
    ADD COLUMN cargo_servicio DECIMAL(12,2) NOT NULL DEFAULT 0.00 AFTER estado;
