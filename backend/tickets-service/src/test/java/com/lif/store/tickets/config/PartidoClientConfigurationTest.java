package com.lif.store.tickets.config;

import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.core.env.MapPropertySource;
import org.springframework.web.client.RestClient;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class PartidoClientConfigurationTest {
    @Test
    void creaClienteSinDependerDeUnBuilderAutoconfigurado() {
        try (var context = new AnnotationConfigApplicationContext()) {
            context.getEnvironment().getPropertySources().addFirst(new MapPropertySource(
                    "test", Map.of("app.services.league-url", "http://localhost:8082")));
            context.register(PartidoClientConfiguration.class);
            context.refresh();
            assertNotNull(context.getBean(RestClient.class));
        }
    }
}
