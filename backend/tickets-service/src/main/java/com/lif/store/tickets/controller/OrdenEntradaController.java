package com.lif.store.tickets.controller;

import com.lif.store.tickets.dto.CompraEntradasRequest;
import com.lif.store.tickets.dto.OrdenEntradaResponse;
import com.lif.store.tickets.service.OrdenEntradaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/entradas")
public class OrdenEntradaController {
    private final OrdenEntradaService service;

    public OrdenEntradaController(OrdenEntradaService service) {
        this.service = service;
    }

    @PostMapping("/compras")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<OrdenEntradaResponse> comprar(
            @Valid @RequestBody CompraEntradasRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        OrdenEntradaResponse orden = service.crear(request, jwt.getSubject(), jwt.getClaimAsString("name"));
        return ResponseEntity.created(URI.create("/api/entradas/" + orden.id())).body(orden);
    }

    @GetMapping("/mias")
    public List<OrdenEntradaResponse> listarMias(@AuthenticationPrincipal Jwt jwt) {
        return service.listarMias(jwt.getSubject());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrdenEntradaResponse> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public OrdenEntradaResponse obtener(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return service.obtener(id, jwt.getSubject(), esAdmin(jwt));
    }

    private boolean esAdmin(Jwt jwt) {
        List<String> roles = jwt.getClaimAsStringList("roles");
        return roles != null && roles.contains("ADMIN");
    }
}
