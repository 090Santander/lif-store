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
@Table(name = "jugadores")
@Getter
@Setter
@NoArgsConstructor
public class Jugador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 150)
    private String nombre;
    @Column(nullable = false, length = 100)
    private String equipo;
    @Column(nullable = false, length = 40)
    private String posicion;
    @Column(nullable = false, length = 3)
    private String dorsal;
    @Column(nullable = false)
    private int pj;
    @Column(nullable = false)
    private int goles;
    @Column(nullable = false)
    private int ta;
    @Column(nullable = false)
    private int tr;
}
