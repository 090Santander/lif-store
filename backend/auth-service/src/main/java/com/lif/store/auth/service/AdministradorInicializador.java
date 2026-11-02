package com.lif.store.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class AdministradorInicializador implements ApplicationRunner {

    private final UsuarioService usuarioService;
    private final String correo;
    private final String clave;

    public AdministradorInicializador(
            UsuarioService usuarioService,
            @Value("${app.admin.email:}") String correo,
            @Value("${app.admin.password:}") String clave) {
        this.usuarioService = usuarioService;
        this.correo = correo;
        this.clave = clave;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (correo.isBlank() || clave.isBlank()) return;
        usuarioService.crearAdministradorSiNoExiste(correo, clave);
    }
}
