package com.lif.store.requests.dto;

import com.lif.store.requests.model.EstadoSolicitud;
import jakarta.validation.constraints.NotNull;

public record CambiarEstadoRequest(@NotNull EstadoSolicitud estado) {
}
