package com.erms.auth.repo;

import com.erms.auth.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long> {
  Optional<AppUser> findByUsername(String username);
  Optional<AppUser> findByEmail(String email);
  boolean existsByUsername(String username);
  boolean existsByEmail(String email);
}
