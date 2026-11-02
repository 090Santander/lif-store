package com.lif.store.requests.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Map;

public record CrearSolicitudRequest(
        @NotBlank @Pattern(regexp = "cancha|equipo|jugador|entrenador|apelacion|otro") String tipo,
        @NotNull @NotEmpty Map<@NotBlank @Size(max = 80) String, @NotNull @Size(max = 500) String> datos,
        @Size(max = 3000) String detalle) {
}
