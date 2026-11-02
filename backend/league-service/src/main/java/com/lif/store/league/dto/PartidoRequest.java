package com.lif.store.league.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record PartidoRequest(
        @NotBlank @Size(max = 100) String equipoLocal,
        @NotBlank @Size(max = 100) String equipoVisitante,
        @NotBlank @Size(max = 20) String fecha,
        @NotBlank @Size(max = 20) String hora,
        @NotBlank @Size(max = 120) String sede,
        @NotBlank @Size(max = 80) String fase,
        @NotNull @DecimalMin("0.00") BigDecimal precio,
        @Size(max = 1000) String descripcion,
        @Size(max = 40) String estado,
        @PositiveOrZero Integer golesLocal,
        @PositiveOrZero Integer golesVisita) {
}
