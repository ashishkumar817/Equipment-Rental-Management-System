package com.erms.auth.controller;

import com.erms.auth.model.AppUser;
import com.erms.auth.repo.UserRepository;
import com.erms.auth.service.AuthService;
import com.erms.model.Customer;
import com.erms.repo.CustomerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepo;
    private final CustomerRepository customerRepo;

    public AuthController(AuthService authService,
                          UserRepository userRepo,
                          CustomerRepository customerRepo) {
        this.authService = authService;
        this.userRepo = userRepo;
        this.customerRepo = customerRepo;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> req) {
        try {
            AppUser u = authService.register(
                    req.get("username"),
                    req.get("password"),
                    req.get("name"),
                    req.get("email")
            );

            // ⭐ CREATE CUSTOMER RECORD AUTOMATICALLY
            Customer c = new Customer();
            c.setName(u.getName());
            c.setEmail(u.getEmail());
            c.setPhone(req.get("phone"));
            c.setAddress(req.get("address"));
            c.setUser(u);

            customerRepo.save(c);

            return ResponseEntity.ok(Map.of(
                    "id", u.getId(),
                    "username", u.getUsername(),
                    "name", u.getName(),
                    "roles", u.getRoles(),
                    "customerId", c.getId()
            ));

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(409).body(Map.of("message", ex.getMessage()));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            Map<String, Object> loginResponse =
                    authService.login(body.get("username"), body.get("password"));

            return ResponseEntity.ok(loginResponse);

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(401).body(Map.of("message", ex.getMessage()));
        }
    }




    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null) return ResponseEntity.status(401).build();

        return userRepo.findByUsername(auth.getName())
                .map(u -> {
                	Customer c = u.getCustomer();   // FIXED RELATION FETCH
                    return ResponseEntity.ok(Map.of(
                            "id", u.getId(),
                            "username", u.getUsername(),
                            "name", u.getName(),
                            "email", u.getEmail(),
                            "roles", u.getRoles(),
                            "customerId", c != null ? c.getId() : null
                    ));
                })
                .orElse(ResponseEntity.status(404).build());
    }
}
