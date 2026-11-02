package com.lif.store.tickets.dto;

import com.lif.store.tickets.model.EstadoOrden;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrdenEntradaResponse(Long id, String solicitante, String nombreSolicitante, Instant creadoEn,
                                   EstadoOrden estado, BigDecimal cargoServicio, BigDecimal total,
                                   List<EntradaOrdenResponse> entradas) {
}
