package com.lif.store.requests.service;

import com.lif.store.requests.dto.CrearSolicitudRequest;
import com.lif.store.requests.dto.SolicitudResponse;
import com.lif.store.requests.model.EstadoSolicitud;
import com.lif.store.requests.model.Solicitud;
import com.lif.store.requests.repository.SolicitudRepository;
import com.lif.store.shared.web.ApiException;
import com.lif.store.shared.web.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SolicitudService {
    private final SolicitudRepository repository;

    public SolicitudService(SolicitudRepository repository) {
        this.repository = repository;
    }

    public SolicitudResponse crear(CrearSolicitudRequest request, String correo, String nombre) {
        Solicitud solicitud = new Solicitud();
        solicitud.setTipo(request.tipo());
        solicitud.setDatos(Map.copyOf(request.datos()));
        solicitud.setDetalle(request.detalle() == null ? "" : request.detalle().trim());
        solicitud.setSolicitante(correo);
        solicitud.setNombreSolicitante(nombre == null || nombre.isBlank() ? correo : nombre);
        solicitud.setEstado(EstadoSolicitud.Pendiente);
        return aResponse(repository.save(solicitud));
    }

    @Transactional(readOnly = true)
    public List<SolicitudResponse> listarMias(String correo) {
        return repository.findAllBySolicitanteIgnoreCaseOrderByFechaDesc(correo).stream().map(this::aResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<SolicitudResponse> listarTodas() {
        return repository.findAllByOrderByFechaDesc().stream().map(this::aResponse).toList();
    }

    @Transactional(readOnly = true)
    public SolicitudResponse obtener(Long id, String correo, boolean administrador) {
        Solicitud solicitud = buscar(id);
        verificarPropiedad(solicitud, correo, administrador);
        return aResponse(solicitud);
    }

    public SolicitudResponse cambiarEstado(Long id, EstadoSolicitud estado) {
        Solicitud solicitud = buscar(id);
        solicitud.setEstado(estado);
        return aResponse(repository.save(solicitud));
    }

    public void eliminar(Long id, String correo, boolean administrador) {
        Solicitud solicitud = buscar(id);
        verificarPropiedad(solicitud, correo, administrador);
        repository.delete(solicitud);
    }

    private Solicitud buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontró la solicitud."));
    }

    private void verificarPropiedad(Solicitud solicitud, String correo, boolean administrador) {
        if (!administrador && !solicitud.getSolicitante().equalsIgnoreCase(correo)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "No tienes permiso para acceder a esta solicitud.");
        }
    }

    private SolicitudResponse aResponse(Solicitud solicitud) {
        return new SolicitudResponse(solicitud.getId(), solicitud.getTipo(), Map.copyOf(solicitud.getDatos()),
                solicitud.getDetalle(), solicitud.getSolicitante(), solicitud.getNombreSolicitante(),
                solicitud.getFecha(), solicitud.getEstado());
    }
}
