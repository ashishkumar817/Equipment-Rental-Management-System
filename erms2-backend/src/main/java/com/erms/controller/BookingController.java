package com.erms.controller;

import com.erms.model.Invoice;
import com.erms.service.InvoiceService;
import com.erms.dto.BookingRequest;
import com.erms.model.Booking;
import com.erms.repo.BookingRepository;
import com.erms.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingRepository repo;
    private final BookingService service;
    private final InvoiceService invoiceService;

    @GetMapping
    public List<Booking> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Booking one(@PathVariable Long id) {
        return service.find(id);
    }

    @PostMapping
    public Booking create(@RequestBody BookingRequest req) {
        return service.createFromRequest(req);
    }

    @PutMapping("/{id}")
    public Booking update(@PathVariable Long id, @RequestBody BookingRequest req) {
        return service.updateFromRequest(id, req);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    @PutMapping("/{id}/complete")
    public Booking complete(@PathVariable Long id) {
        return service.markCompleted(id);
    }

    @PutMapping("/{id}/cancel")
    public Booking cancel(@PathVariable Long id) {
        return service.cancelBooking(id);
    }
    @GetMapping("/fix-invoices")
    public String fixInvoices() {

        List<Booking> all = repo.findAll();
        int created = 0;

        for (Booking b : all) {
            if (b.getInvoice() == null) {
                service.generateInvoice(b); // <-- Correct call
                created++;
            }
        }

        return "Invoices generated: " + created;
    }
    @GetMapping("/{id}/regenerate-invoice")
    public Invoice regenerate(@PathVariable Long id) {
        Booking b = service.find(id);
        return invoiceService.issueInvoice(b);
    }

 // ⭐ USER: Fetch only bookings for a specific customer
    @GetMapping("/my/{customerId}")
    public List<Booking> myBookings(@PathVariable Long customerId) {
        return repo.findByCustomer_Id(customerId);
    }

    
}
