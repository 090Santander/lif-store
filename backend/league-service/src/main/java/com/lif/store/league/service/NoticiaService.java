package com.lif.store.league.service;

import com.lif.store.league.dto.NoticiaRequest;
import com.lif.store.league.dto.NoticiaResponse;
import com.lif.store.league.model.Noticia;
import com.lif.store.league.repository.NoticiaRepository;
import com.lif.store.shared.web.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NoticiaService {
    private final NoticiaRepository repository;

    public NoticiaService(NoticiaRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<NoticiaResponse> listar() {
        return repository.findAll().stream().map(this::aResponse).toList();
    }

    @Transactional(readOnly = true)
    public NoticiaResponse obtener(Long id) {
        return aResponse(buscar(id));
    }

    public NoticiaResponse crear(NoticiaRequest request) {
        Noticia noticia = new Noticia();
        aplicar(noticia, request);
        return aResponse(repository.save(noticia));
    }

    public NoticiaResponse actualizar(Long id, NoticiaRequest request) {
        Noticia noticia = buscar(id);
        aplicar(noticia, request);
        return aResponse(repository.save(noticia));
    }

    public void eliminar(Long id) {
        repository.delete(buscar(id));
    }

    private Noticia buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontró la noticia."));
    }

    private void aplicar(Noticia noticia, NoticiaRequest request) {
        noticia.setTitulo(request.titulo().trim());
        noticia.setCategoria(request.categoria().trim());
        noticia.setFecha(request.fecha().trim());
        noticia.setResumen(request.resumen().trim());
        noticia.setDestacada(request.destacada());
    }

    private NoticiaResponse aResponse(Noticia noticia) {
        return new NoticiaResponse(noticia.getId(), noticia.getTitulo(), noticia.getCategoria(),
                noticia.getFecha(), noticia.getResumen(), noticia.isDestacada());
    }
}
