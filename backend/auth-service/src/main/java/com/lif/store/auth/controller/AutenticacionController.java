package com.lif.store.auth.controller;

import com.lif.store.auth.dto.AutenticacionResponse;
import com.lif.store.auth.dto.LoginRequest;
import com.lif.store.auth.dto.RegistroUsuarioRequest;
import com.lif.store.auth.dto.UsuarioResponse;
import com.lif.store.auth.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AutenticacionController {

    private final UsuarioService usuarioService;

    public AutenticacionController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AutenticacionResponse registrar(@Valid @RequestBody RegistroUsuarioRequest request) {
        return usuarioService.registrar(request);
    }

    @PostMapping("/login")
    public AutenticacionResponse iniciarSesion(@Valid @RequestBody LoginRequest request) {
        return usuarioService.iniciarSesion(request);
    }

    @GetMapping("/me")
    public UsuarioResponse miPerfil(@AuthenticationPrincipal Jwt jwt) {
        return usuarioService.obtenerPorCorreo(jwt.getSubject());
    }
}
