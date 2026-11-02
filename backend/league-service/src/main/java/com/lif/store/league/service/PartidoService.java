package com.lif.store.league.service;

import com.lif.store.league.dto.PartidoRequest;
import com.lif.store.league.dto.PartidoResponse;
import com.lif.store.league.model.Partido;
import com.lif.store.league.repository.PartidoRepository;
import com.lif.store.shared.web.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PartidoService {
    private final PartidoRepository repository;

    public PartidoService(PartidoRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<PartidoResponse> listar() {
        return repository.findAll().stream().map(this::aResponse).toList();
    }

    @Transactional(readOnly = true)
    public PartidoResponse obtener(Long id) {
        return aResponse(buscar(id));
    }

    public PartidoResponse crear(PartidoRequest request) {
        Partido partido = new Partido();
        aplicar(partido, request);
        return aResponse(repository.save(partido));
    }

    public PartidoResponse actualizar(Long id, PartidoRequest request) {
        Partido partido = buscar(id);
        aplicar(partido, request);
        return aResponse(repository.save(partido));
    }

    public void eliminar(Long id) {
        repository.delete(buscar(id));
    }

    private Partido buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontró el partido."));
    }

    private void aplicar(Partido partido, PartidoRequest request) {
        partido.setEquipoLocal(request.equipoLocal().trim());
        partido.setEquipoVisitante(request.equipoVisitante().trim());
        partido.setFecha(request.fecha().trim());
        partido.setHora(request.hora().trim());
        partido.setSede(request.sede().trim());
        partido.setFase(request.fase().trim());
        partido.setPrecio(request.precio());
        partido.setDescripcion(request.descripcion() == null ? null : request.descripcion().trim());
        partido.setEstado(request.estado() == null || request.estado().isBlank() ? "Programado" : request.estado().trim());
        partido.setGolesLocal(request.golesLocal());
        partido.setGolesVisita(request.golesVisita());
    }

    private PartidoResponse aResponse(Partido partido) {
        return new PartidoResponse(partido.getId(), partido.getEquipoLocal(), partido.getEquipoVisitante(),
                partido.getFecha(), partido.getHora(), partido.getSede(), partido.getFase(), partido.getPrecio(),
                partido.getDescripcion(), partido.getEstado(), partido.getGolesLocal(), partido.getGolesVisita());
    }
}
