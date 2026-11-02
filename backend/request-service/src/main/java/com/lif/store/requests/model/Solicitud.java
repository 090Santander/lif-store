package com.lif.store.requests.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Map;

@Entity
@Table(name = "solicitudes")
@Getter
@Setter
@NoArgsConstructor
public class Solicitud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 32)
    private String tipo;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "json")
    private Map<String, String> datos;
    @Column(nullable = false, length = 3000)
    private String detalle;
    @Column(nullable = false, length = 254)
    private String solicitante;
    @Column(name = "nombre_solicitante", nullable = false, length = 200)
    private String nombreSolicitante;
    @Column(nullable = false, updatable = false)
    private Instant fecha;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private EstadoSolicitud estado = EstadoSolicitud.Pendiente;

    @PrePersist
    void onCreate() {
        if (fecha == null) fecha = Instant.now();
    }
}
