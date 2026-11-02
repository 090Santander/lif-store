package com.lif.store.tickets.repository;

import com.lif.store.tickets.model.OrdenEntrada;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdenEntradaRepository extends JpaRepository<OrdenEntrada, Long> {
    List<OrdenEntrada> findAllBySolicitanteIgnoreCaseOrderByCreadoEnDesc(String solicitante);
    List<OrdenEntrada> findAllByOrderByCreadoEnDesc();
}
