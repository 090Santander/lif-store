package com.lif.store.requests.repository;

import com.lif.store.requests.model.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {
    List<Solicitud> findAllBySolicitanteIgnoreCaseOrderByFechaDesc(String solicitante);
    List<Solicitud> findAllByOrderByFechaDesc();
}
