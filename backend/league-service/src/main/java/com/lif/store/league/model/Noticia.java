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

@Entity
@Table(name = "noticias")
@Getter
@Setter
@NoArgsConstructor
public class Noticia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 180)
    private String titulo;
    @Column(nullable = false, length = 60)
    private String categoria;
    @Column(nullable = false, length = 80)
    private String fecha;
    @Column(nullable = false, length = 2000)
    private String resumen;
    @Column(nullable = false)
    private boolean destacada;
}
