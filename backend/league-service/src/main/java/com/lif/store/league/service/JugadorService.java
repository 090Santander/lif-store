package com.lif.store.league.service;

import com.lif.store.league.dto.JugadorRequest;
import com.lif.store.league.dto.JugadorResponse;
import com.lif.store.league.model.Jugador;
import com.lif.store.league.repository.JugadorRepository;
import com.lif.store.shared.web.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class JugadorService {
    private final JugadorRepository repository;

    public JugadorService(JugadorRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<JugadorResponse> listar() {
        return repository.findAll().stream().map(this::aResponse).toList();
    }

    @Transactional(readOnly = true)
    public JugadorResponse obtener(Long id) {
        return aResponse(buscar(id));
    }

    public JugadorResponse crear(JugadorRequest request) {
        Jugador jugador = new Jugador();
        aplicar(jugador, request);
        return aResponse(repository.save(jugador));
    }

    public JugadorResponse actualizar(Long id, JugadorRequest request) {
        Jugador jugador = buscar(id);
        aplicar(jugador, request);
        return aResponse(repository.save(jugador));
    }

    public void eliminar(Long id) {
        repository.delete(buscar(id));
    }

    private Jugador buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontró el jugador."));
    }

    private void aplicar(Jugador jugador, JugadorRequest request) {
        jugador.setNombre(request.nombre().trim());
        jugador.setEquipo(request.equipo().trim());
        jugador.setPosicion(request.posicion().trim());
        jugador.setDorsal(request.dorsal().trim());
        jugador.setPj(valor(request.pj()));
        jugador.setGoles(valor(request.goles()));
        jugador.setTa(valor(request.ta()));
        jugador.setTr(valor(request.tr()));
    }

    private int valor(Integer value) {
        return value == null ? 0 : value;
    }

    private JugadorResponse aResponse(Jugador jugador) {
        return new JugadorResponse(jugador.getId(), jugador.getNombre(), jugador.getEquipo(), jugador.getPosicion(),
                jugador.getDorsal(), jugador.getPj(), jugador.getGoles(), jugador.getTa(), jugador.getTr());
    }
}
