package com.lif.store.league.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "partidos")
@Getter
@Setter
@NoArgsConstructor
public class Partido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "equipo_local", nullable = false, length = 100)
    private String equipoLocal;
    @Column(name = "equipo_visitante", nullable = false, length = 100)
    private String equipoVisitante;
    @Column(nullable = false, length = 20)
    private String fecha;
    @Column(nullable = false, length = 20)
    private String hora;
    @Column(nullable = false, length = 120)
    private String sede;
    @Column(nullable = false, length = 80)
    private String fase;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal precio;
    @Column(length = 1000)
    private String descripcion;
    @Column(nullable = false, length = 40)
    private String estado = "Programado";
    @Column(name = "goles_local")
    private Integer golesLocal;
    @Column(name = "goles_visita")
    private Integer golesVisita;
}
