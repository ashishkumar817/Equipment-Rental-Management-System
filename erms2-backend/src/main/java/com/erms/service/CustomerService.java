package com.erms.service;

import com.erms.model.Customer;
import com.erms.repo.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepo;

    public List<Customer> getAll() {
        return customerRepo.findAll();
    }

    public Customer getById(Long id) {
        return customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer create(Customer c) {
        return customerRepo.save(c);
    }

    public Customer update(Long id, Customer newData) {
        Customer c = getById(id);

        c.setName(newData.getName());
        c.setEmail(newData.getEmail());
        c.setPhone(newData.getPhone());
        c.setAddress(newData.getAddress());

        return customerRepo.save(c);
    }

    public void delete(Long id) {
        customerRepo.deleteById(id);
    }
}
