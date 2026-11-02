package com.lif.store.auth.dto;

import com.lif.store.auth.validation.RunValido;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistroUsuarioRequest(
        @NotBlank @RunValido String run,
        @NotBlank @Email @Size(max = 254) String correo,
        @NotBlank @Size(max = 80) String nombre,
        @NotBlank @Size(max = 120) String apellidos,
        @NotBlank @Size(min = 8, max = 72) String clave) {
}
