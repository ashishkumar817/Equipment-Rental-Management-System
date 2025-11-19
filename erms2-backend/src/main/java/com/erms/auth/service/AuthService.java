package com.erms.auth.service;

import com.erms.auth.jwt.JwtUtil;
import com.erms.auth.model.AppUser;
import com.erms.auth.repo.UserRepository;
import com.erms.model.Customer;
import com.erms.repo.CustomerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final CustomerRepository customerRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepo,
                       CustomerRepository customerRepo,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {

        this.userRepo = userRepo;
        this.customerRepo = customerRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // ---------------------------
    // REGISTER
    // ---------------------------
    public AppUser register(String username, String rawPassword, String name, String email) {

        if (userRepo.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already in use");
        }

        // New users always get ROLE_USER
        AppUser u = AppUser.builder()
                .username(username)
                .password(passwordEncoder.encode(rawPassword))
                .name(name)
                .email(email)
                .roles(Set.of("ROLE_USER"))
                .build();

        return userRepo.save(u);
    }

    // ---------------------------
    // LOGIN
    // ---------------------------
    public Map<String, Object> login(String username, String rawPassword) {

        AppUser u = userRepo.findByUsername(username)
                .or(() -> userRepo.findByEmail(username))
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(rawPassword, u.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(u.getUsername());

        Customer customer = u.getCustomer();

        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", u.getId());
        userMap.put("username", u.getUsername());
        userMap.put("name", u.getName());
        userMap.put("email", u.getEmail());
        userMap.put("roles", u.getRoles());
        userMap.put("customerId", customer != null ? customer.getId() : null);

        return Map.of(
                "token", token,
                "user", userMap
        );
    }
}
