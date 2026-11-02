package com.lif.store.tickets.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ItemCompraRequest(
        @NotNull @Positive Long partidoId,
        @Min(1) @Max(10) int cantidad) {
}
