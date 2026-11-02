package com.lif.store.tickets;

import com.lif.store.shared.security.ApiSecurityConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(ApiSecurityConfiguration.class)
public class TicketsServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(TicketsServiceApplication.class, args);
    }
}
