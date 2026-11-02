package com.lif.store.tickets.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@Configuration
public class PartidoClientConfiguration {
    @Bean
    RestClient ligaRestClient(RestClient.Builder builder,
                              @Value("${app.services.league-url}") String leagueUrl) {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(Duration.ofSeconds(2));
        requestFactory.setReadTimeout(Duration.ofSeconds(3));
        return builder.baseUrl(leagueUrl).requestFactory(requestFactory).build();
    }
}
