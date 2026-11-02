package com.lif.store.requests.controller;

import com.lif.store.requests.dto.CambiarEstadoRequest;
import com.lif.store.requests.dto.CrearSolicitudRequest;
import com.lif.store.requests.dto.SolicitudResponse;
import com.lif.store.requests.service.SolicitudService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudController {
    private final SolicitudService service;

    public SolicitudController(SolicitudService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<SolicitudResponse> crear(
            @Valid @RequestBody CrearSolicitudRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        SolicitudResponse solicitud = service.crear(request, jwt.getSubject(), jwt.getClaimAsString("name"));
        URI location = URI.create("/api/solicitudes/" + solicitud.id());
        return ResponseEntity.created(location).body(solicitud);
    }

    @GetMapping("/mias")
    public List<SolicitudResponse> listarMias(@AuthenticationPrincipal Jwt jwt) {
        return service.listarMias(jwt.getSubject());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<SolicitudResponse> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public SolicitudResponse obtener(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return service.obtener(id, jwt.getSubject(), esAdmin(jwt));
    }

    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasRole('ADMIN')")
    public SolicitudResponse cambiarEstado(@PathVariable Long id, @Valid @RequestBody CambiarEstadoRequest request) {
        return service.cambiarEstado(id, request.estado());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        service.eliminar(id, jwt.getSubject(), esAdmin(jwt));
    }

    private boolean esAdmin(Jwt jwt) {
        List<String> roles = jwt.getClaimAsStringList("roles");
        return roles != null && roles.contains("ADMIN");
    }
}
