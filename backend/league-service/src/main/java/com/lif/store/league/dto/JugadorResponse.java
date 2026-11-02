package com.lif.store.league.dto;

public record JugadorResponse(Long id, String nombre, String equipo, String posicion, String dorsal,
                              int pj, int goles, int ta, int tr) {
}
