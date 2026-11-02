package com.lif.store.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfiguration {

    @Bean
    RouteLocator lifRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-api", route -> route.path("/api/auth/**").uri("lb://auth-service"))
                .route("users-api", route -> route.path("/api/usuarios/**").uri("lb://auth-service"))
                .route("matches-api", route -> route.path("/api/partidos/**").uri("lb://league-service"))
                .route("news-api", route -> route.path("/api/noticias/**").uri("lb://league-service"))
                .route("players-api", route -> route.path("/api/jugadores/**").uri("lb://league-service"))
                .route("requests-api", route -> route.path("/api/solicitudes/**").uri("lb://request-service"))
                .route("tickets-api", route -> route.path("/api/entradas/**").uri("lb://tickets-service"))
                .build();
    }
}
