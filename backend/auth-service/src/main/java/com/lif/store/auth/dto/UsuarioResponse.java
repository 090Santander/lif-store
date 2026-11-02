package com.lif.store.auth.dto;

import java.time.Instant;

public record UsuarioResponse(
        Long id,
        String run,
        String correo,
        String nombre,
        String apellidos,
        String rol,
        Instant creadoEn) {
}
