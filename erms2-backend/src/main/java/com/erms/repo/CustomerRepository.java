package com.erms.repo;

import com.erms.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // ⭐ REQUIRED for login to work
    Optional<Customer> findByEmail(String email);
    
}
