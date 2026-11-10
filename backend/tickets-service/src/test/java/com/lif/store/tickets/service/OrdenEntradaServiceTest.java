package com.lif.store.tickets.service;

import com.lif.store.shared.web.ApiException;
import com.lif.store.tickets.dto.CompraEntradasRequest;
import com.lif.store.tickets.dto.ItemCompraRequest;
import com.lif.store.tickets.model.OrdenEntrada;
import com.lif.store.tickets.repository.OrdenEntradaRepository;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class OrdenEntradaServiceTest {
    private final OrdenEntradaRepository repository = mock(OrdenEntradaRepository.class);
    private final RestClient.Builder clientBuilder = RestClient.builder().baseUrl("http://liga.test");
    private final MockRestServiceServer server = MockRestServiceServer.bindTo(clientBuilder).build();
    private final OrdenEntradaService service = new OrdenEntradaService(repository, clientBuilder.build());

    @Test
    void rechazaPartidosFinalizados() {
        server.expect(requestTo("http://liga.test/api/partidos/1"))
                .andRespond(withSuccess(partido("Finalizado", 5000), MediaType.APPLICATION_JSON));

        ApiException error = assertThrows(ApiException.class,
                () -> service.crear(compra(), "hincha@lif.cl", "Hincha"));

        assertEquals(HttpStatus.CONFLICT, error.getStatus());
        verify(repository, never()).save(any());
        server.verify();
    }

    @Test
    void permiteEntradasGratuitasSinCargo() {
        server.expect(requestTo("http://liga.test/api/partidos/1"))
                .andRespond(withSuccess(partido("Programado", 0), MediaType.APPLICATION_JSON));
        when(repository.save(any(OrdenEntrada.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var orden = service.crear(compra(), "hincha@lif.cl", "Hincha");

        assertEquals(BigDecimal.ZERO.setScale(2), orden.total());
        assertEquals(BigDecimal.ZERO.setScale(2), orden.cargoServicio());
        verify(repository).save(any(OrdenEntrada.class));
        server.verify();
    }

    private CompraEntradasRequest compra() {
        return new CompraEntradasRequest(List.of(new ItemCompraRequest(1L, 2)));
    }

    private String partido(String estado, int precio) {
        return """
                {"id":1,"equipoLocal":"Local","equipoVisitante":"Visita",
                "fecha":"2026-11-20","hora":"15:00","sede":"Cancha",
                "precio":%d,"estado":"%s"}
                """.formatted(precio, estado);
    }
}
