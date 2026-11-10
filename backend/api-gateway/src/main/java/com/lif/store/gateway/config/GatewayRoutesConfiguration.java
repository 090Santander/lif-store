package com.lif.store.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.builder.GatewayFilterSpec;
import org.springframework.cloud.gateway.route.builder.UriSpec;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfiguration {

    @Bean
    RouteLocator lifRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-api", route -> route.path("/api/auth/**").filters(this::deduplicarCors).uri("lb://auth-service"))
                .route("users-api", route -> route.path("/api/usuarios/**").filters(this::deduplicarCors).uri("lb://auth-service"))
                .route("matches-api", route -> route.path("/api/partidos/**").filters(this::deduplicarCors).uri("lb://league-service"))
                .route("news-api", route -> route.path("/api/noticias/**").filters(this::deduplicarCors).uri("lb://league-service"))
                .route("players-api", route -> route.path("/api/jugadores/**").filters(this::deduplicarCors).uri("lb://league-service"))
                .route("requests-api", route -> route.path("/api/solicitudes/**").filters(this::deduplicarCors).uri("lb://request-service"))
                .route("tickets-api", route -> route.path("/api/entradas/**").filters(this::deduplicarCors).uri("lb://tickets-service"))
                .build();
    }
    private UriSpec deduplicarCors(GatewayFilterSpec filters) {
        return filters.dedupeResponseHeader(
                "Access-Control-Allow-Origin Access-Control-Allow-Credentials Access-Control-Expose-Headers",
                "RETAIN_FIRST");
    }
}
