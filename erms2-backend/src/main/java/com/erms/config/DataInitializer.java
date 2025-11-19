package com.erms.config;

import com.erms.auth.model.AppUser;
import com.erms.auth.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDefaultAdmin(UserRepository userRepo,
                                              PasswordEncoder encoder) {
        return args -> {

            if (!userRepo.existsByUsername("admin")) {

                AppUser admin = AppUser.builder()
                        .username("admin")
                        .password(encoder.encode("admin123"))
                        .email("admin@example.com")
                        .name("Default Admin")
                        .roles(Set.of("ROLE_ADMIN"))
                        .build();

                userRepo.save(admin);

                System.out.println("⭐ Default admin created: admin / admin123");
            }
        };
    }
}
