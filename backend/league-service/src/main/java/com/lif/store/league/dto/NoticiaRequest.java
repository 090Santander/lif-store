package com.lif.store.league.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NoticiaRequest(
        @NotBlank @Size(max = 180) String titulo,
        @NotBlank @Size(max = 60) String categoria,
        @NotBlank @Size(max = 80) String fecha,
        @NotBlank @Size(max = 2000) String resumen,
        boolean destacada) {
}
