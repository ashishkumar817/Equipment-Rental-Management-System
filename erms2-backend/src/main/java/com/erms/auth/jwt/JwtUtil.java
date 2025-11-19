package com.erms.auth.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

  private final Key key;
  private final long expirationMs;

  public JwtUtil(@Value("${app.jwt.secret}") String secret,
                 @Value("${app.jwt.expiration-ms}") String expirationMsStr) {
    this.key = Keys.hmacShaKeyFor(secret.getBytes());

    long parsed = 86400000L; // default 1 day
    if (expirationMsStr != null) {
      // extract digits from the property (handles "86400000", "86400000#24hours", etc.)
      String digits = expirationMsStr.replaceAll("[^0-9]", "");
      if (!digits.isEmpty()) {
        try {
          parsed = Long.parseLong(digits);
        } catch (NumberFormatException ignored) { }
      }
    }
    this.expirationMs = parsed;
  }

  public String generateToken(String username) {
    Date now = new Date();
    Date exp = new Date(now.getTime() + expirationMs);
    return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(now)
            .setExpiration(exp)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
  }

  public String getUsername(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validate(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (JwtException | IllegalArgumentException e) {
      return false;
    }
  }
}
