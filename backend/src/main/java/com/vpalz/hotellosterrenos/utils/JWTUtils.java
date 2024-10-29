package com.vpalz.hotellosterrenos.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

/**
 * This file is a little worrisome because
 * I think its preventing the login process from working properly.
 * Need to verify?
 */

@Service
public class JWTUtils {
    private static final long EXPIRATION_TIME = 60 * 60 * 24 * 7;

    private final SecretKey Key;

    public JWTUtils() {
        String secretString = "1293847568170357169387562938745623948756234987523649587234659823746598273465987236498572364598716234152345234523987562139481234";
        byte[] keyBytes = Base64.getDecoder().decode(secretString.getBytes(StandardCharsets.UTF_8));
        this.Key = new SecretKeySpec(keyBytes,  "Jwts.SIG.RS512");
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(Jwts.parser().verifyWith(Key).build().parseSignedClaims(token).getPayload());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !expiredToken(token));
    }

    private boolean expiredToken(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}
