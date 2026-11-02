package com.lif.store.tickets.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CompraEntradasRequest(@NotEmpty @Size(max = 10) List<@Valid ItemCompraRequest> entradas) {
}
