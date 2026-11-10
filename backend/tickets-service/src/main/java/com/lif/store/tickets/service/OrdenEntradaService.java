package com.lif.store.tickets.service;

import com.lif.store.shared.web.ApiException;
import com.lif.store.shared.web.NotFoundException;
import com.lif.store.tickets.dto.CompraEntradasRequest;
import com.lif.store.tickets.dto.EntradaOrdenResponse;
import com.lif.store.tickets.dto.ItemCompraRequest;
import com.lif.store.tickets.dto.OrdenEntradaResponse;
import com.lif.store.tickets.dto.PartidoTicketResponse;
import com.lif.store.tickets.model.EntradaOrden;
import com.lif.store.tickets.model.OrdenEntrada;
import com.lif.store.tickets.repository.OrdenEntradaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@Transactional
public class OrdenEntradaService {
    private final OrdenEntradaRepository repository;
    private final RestClient ligaRestClient;

    public OrdenEntradaService(OrdenEntradaRepository repository, RestClient ligaRestClient) {
        this.repository = repository;
        this.ligaRestClient = ligaRestClient;
    }

    public OrdenEntradaResponse crear(CompraEntradasRequest request, String correo, String nombre) {
        OrdenEntrada orden = new OrdenEntrada();
        orden.setSolicitante(correo);
        orden.setNombreSolicitante(nombre == null || nombre.isBlank() ? correo : nombre);
        orden.setTotal(BigDecimal.ZERO);

        for (ItemCompraRequest item : request.entradas()) {
            PartidoTicketResponse partido = obtenerPartido(item.partidoId());
            BigDecimal precio = partido.precio();
            BigDecimal subtotal = precio.multiply(BigDecimal.valueOf(item.cantidad()));
            EntradaOrden entrada = new EntradaOrden();
            entrada.setPartidoId(partido.id());
            entrada.setEncuentro(partido.equipoLocal() + " vs " + partido.equipoVisitante());
            entrada.setFechaPartido(partido.fecha() + " · " + partido.hora());
            entrada.setSede(partido.sede());
            entrada.setCantidad(item.cantidad());
            entrada.setPrecioUnitario(precio);
            entrada.setSubtotal(subtotal);
            orden.agregarEntrada(entrada);
            orden.setTotal(orden.getTotal().add(subtotal));
        }

        BigDecimal cargoServicio = orden.getTotal().multiply(new BigDecimal("0.10"))
                .setScale(2, RoundingMode.HALF_UP);
        orden.setCargoServicio(cargoServicio);
        orden.setTotal(orden.getTotal().add(cargoServicio));

        return aResponse(repository.save(orden));
    }

    @Transactional(readOnly = true)
    public List<OrdenEntradaResponse> listarMias(String correo) {
        return repository.findAllBySolicitanteIgnoreCaseOrderByCreadoEnDesc(correo).stream().map(this::aResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<OrdenEntradaResponse> listarTodas() {
        return repository.findAllByOrderByCreadoEnDesc().stream().map(this::aResponse).toList();
    }

    @Transactional(readOnly = true)
    public OrdenEntradaResponse obtener(Long id, String correo, boolean administrador) {
        OrdenEntrada orden = buscar(id);
        verificarPropiedad(orden, correo, administrador);
        return aResponse(orden);
    }

    private PartidoTicketResponse obtenerPartido(Long id) {
        try {
            PartidoTicketResponse partido = ligaRestClient.get()
                    .uri("/api/partidos/{id}", id)
                    .retrieve()
                    .body(PartidoTicketResponse.class);
            if (partido == null || partido.precio() == null || partido.precio().signum() < 0) {
                throw new ApiException(HttpStatus.BAD_GATEWAY, "El servicio de partidos devolvió datos incompletos.");
            }
            if (!"Programado".equalsIgnoreCase(partido.estado())) {
                throw new ApiException(HttpStatus.CONFLICT, "El partido no está disponible para entradas.");
            }
            return partido;
        } catch (RestClientResponseException exception) {
            if (exception.getStatusCode().is4xxClientError()) {
                throw new NotFoundException("No se encontró el partido " + id + " o no está disponible para entradas.");
            }
            throw new ApiException(HttpStatus.BAD_GATEWAY, "No se pudo consultar el precio del partido.");
        } catch (ResourceAccessException exception) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "El servicio de partidos no está disponible.");
        }
    }

    private OrdenEntrada buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("No se encontró la orden de entradas."));
    }

    private void verificarPropiedad(OrdenEntrada orden, String correo, boolean administrador) {
        if (!administrador && !orden.getSolicitante().equalsIgnoreCase(correo)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "No tienes permiso para consultar esta orden.");
        }
    }

    private OrdenEntradaResponse aResponse(OrdenEntrada orden) {
        List<EntradaOrdenResponse> entradas = orden.getEntradas().stream()
                .map(entrada -> new EntradaOrdenResponse(entrada.getPartidoId(), entrada.getEncuentro(),
                        entrada.getFechaPartido(), entrada.getSede(), entrada.getCantidad(),
                        entrada.getPrecioUnitario(), entrada.getSubtotal()))
                .toList();
        return new OrdenEntradaResponse(orden.getId(), orden.getSolicitante(), orden.getNombreSolicitante(),
                orden.getCreadoEn(), orden.getEstado(), orden.getCargoServicio(), orden.getTotal(), entradas);
    }
}
