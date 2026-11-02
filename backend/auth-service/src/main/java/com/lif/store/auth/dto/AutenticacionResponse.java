package com.lif.store.auth.dto;

import java.time.Instant;

public record AutenticacionResponse(
        String token,
        String tipoToken,
        Instant expiraEn,
        UsuarioResponse usuario) {
}
