package com.lif.store.requests.dto;

import com.lif.store.requests.model.EstadoSolicitud;

import java.time.Instant;
import java.util.Map;

public record SolicitudResponse(
        Long id,
        String tipo,
        Map<String, String> datos,
        String detalle,
        String solicitante,
        String nombreSolicitante,
        Instant fecha,
        EstadoSolicitud estado) {
}
