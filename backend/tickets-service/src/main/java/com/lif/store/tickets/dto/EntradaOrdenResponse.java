package com.lif.store.tickets.dto;

import java.math.BigDecimal;

public record EntradaOrdenResponse(Long partidoId, String encuentro, String fechaPartido, String sede,
                                   int cantidad, BigDecimal precioUnitario, BigDecimal subtotal) {
}
