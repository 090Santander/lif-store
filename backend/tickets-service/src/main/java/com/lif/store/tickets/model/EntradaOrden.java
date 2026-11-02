package com.lif.store.tickets.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "entradas_orden")
@Getter
@Setter
@NoArgsConstructor
public class EntradaOrden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "orden_id", nullable = false)
    private OrdenEntrada orden;
    @Column(name = "partido_id", nullable = false)
    private Long partidoId;
    @Column(nullable = false, length = 220)
    private String encuentro;
    @Column(name = "fecha_partido", nullable = false, length = 40)
    private String fechaPartido;
    @Column(nullable = false, length = 120)
    private String sede;
    @Column(nullable = false)
    private int cantidad;
    @Column(name = "precio_unitario", nullable = false, precision = 12, scale = 2)
    private BigDecimal precioUnitario;
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;
}
