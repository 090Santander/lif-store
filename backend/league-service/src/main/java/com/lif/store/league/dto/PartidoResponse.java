package com.lif.store.league.dto;

import java.math.BigDecimal;

public record PartidoResponse(
        Long id,
        String equipoLocal,
        String equipoVisitante,
        String fecha,
        String hora,
        String sede,
        String fase,
        BigDecimal precio,
        String descripcion,
        String estado,
        Integer golesLocal,
        Integer golesVisita) {
}
