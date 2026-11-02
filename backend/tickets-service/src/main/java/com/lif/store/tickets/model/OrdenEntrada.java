package com.lif.store.tickets.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ordenes_entradas")
@Getter
@Setter
@NoArgsConstructor
public class OrdenEntrada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 254)
    private String solicitante;
    @Column(name = "nombre_solicitante", nullable = false, length = 200)
    private String nombreSolicitante;
    @Column(name = "creado_en", nullable = false, updatable = false)
    private Instant creadoEn;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24)
    private EstadoOrden estado = EstadoOrden.PENDIENTE_PAGO;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal total = BigDecimal.ZERO;
    @Column(name = "cargo_servicio", nullable = false, precision = 12, scale = 2)
    private BigDecimal cargoServicio = BigDecimal.ZERO;
    @OneToMany(mappedBy = "orden", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EntradaOrden> entradas = new ArrayList<>();

    public void agregarEntrada(EntradaOrden entrada) {
        entradas.add(entrada);
        entrada.setOrden(this);
    }

    @PrePersist
    void onCreate() {
        if (creadoEn == null) creadoEn = Instant.now();
    }
}
