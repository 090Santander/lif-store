package com.lif.store.tickets.dto;

import java.math.BigDecimal;

public record PartidoTicketResponse(Long id, String equipoLocal, String equipoVisitante,
                                    String fecha, String hora, String sede, BigDecimal precio,
                                    String estado) {
}
