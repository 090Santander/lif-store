package com.lif.store.league.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record JugadorRequest(
        @NotBlank @Size(max = 150) String nombre,
        @NotBlank @Size(max = 100) String equipo,
        @NotBlank @Size(max = 40) String posicion,
        @NotBlank @Size(max = 3) String dorsal,
        @PositiveOrZero Integer pj,
        @PositiveOrZero Integer goles,
        @PositiveOrZero Integer ta,
        @PositiveOrZero Integer tr) {
}
