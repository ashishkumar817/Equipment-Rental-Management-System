package com.erms.controller;

import com.erms.model.Invoice;
import com.erms.repo.InvoiceRepository;
import com.erms.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceRepository repo;
    private final InvoiceService service;

    @GetMapping
    public List<Invoice> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Invoice one(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    @PutMapping("/{id}/pay")
    public Invoice pay(@PathVariable Long id) {
        return service.markPaid(id);
    }

    // ⭐ USER INVOICES
    @GetMapping("/my/{customerId}")
    public List<Invoice> myInvoices(@PathVariable Long customerId) {
        return service.findByCustomerId(customerId);
    }
}
