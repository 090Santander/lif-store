package com.lif.store.shared.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Service
public class JwtTokenService {

    private final JwtEncoder jwtEncoder;
    private final Duration tokenDuration;

    public JwtTokenService(
            JwtEncoder jwtEncoder,
            @Value("${app.security.jwt-expiration:PT8H}") Duration tokenDuration) {
        this.jwtEncoder = jwtEncoder;
        this.tokenDuration = tokenDuration;
    }

    public IssuedToken issue(String email, String fullName, String role) {
        Instant issuedAt = Instant.now();
        Instant expiresAt = issuedAt.plus(tokenDuration);
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("lif-store")
                .subject(email)
                .issuedAt(issuedAt)
                .expiresAt(expiresAt)
                .claim("name", fullName)
                .claim("roles", List.of(role))
                .build();
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        String token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
        return new IssuedToken(token, expiresAt);
    }

    public record IssuedToken(String value, Instant expiresAt) {
    }
}
