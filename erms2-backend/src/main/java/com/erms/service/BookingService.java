package com.erms.service;

import com.erms.model.*;
import com.erms.repo.BookingRepository;
import com.erms.dto.BookingRequest;  
import com.erms.repo.CustomerRepository;
import com.erms.repo.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository repo;
    private final CustomerRepository customerRepo;
    private final EquipmentRepository equipmentRepo;
    private final InvoiceService invoiceService;
    private final PaymentService paymentService;


    // ---------------- CREATE ----------------
    @Transactional
    public Booking create(Booking booking) {

        // Convert customerId → Customer entity
        if (booking.getCustomer() == null && booking.getCustomerId() != null) {
            Customer c = customerRepo.findById(booking.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            booking.setCustomer(c);
        }

        // Convert equipmentId → Equipment entity
        if (booking.getEquipment() == null && booking.getEquipmentId() != null) {
            Equipment e = equipmentRepo.findById(booking.getEquipmentId())
                    .orElseThrow(() -> new RuntimeException("Equipment not found"));
            booking.setEquipment(e);
        }

        Booking saved = repo.save(booking);

        // Auto-generate invoice
        invoiceService.issueInvoice(saved);

        return saved;
    }

    // ---------------- UPDATE ----------------
    @Transactional
    public Booking update(Long id, Booking incoming) {

        Booking ex = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Handle customer change
        if (incoming.getCustomerId() != null) {
            Customer c = customerRepo.findById(incoming.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            ex.setCustomer(c);
        }

        // Handle equipment change
        if (incoming.getEquipmentId() != null) {
            Equipment e = equipmentRepo.findById(incoming.getEquipmentId())
                    .orElseThrow(() -> new RuntimeException("Equipment not found"));
            ex.setEquipment(e);
        }

        ex.setStartDate(incoming.getStartDate());
        ex.setEndDate(incoming.getEndDate());
        ex.setDurationType(incoming.getDurationType());
        ex.setStatus(incoming.getStatus());

        Booking updated = repo.save(ex);

        invoiceService.issueInvoice(updated);

        return updated;
    }

    public Booking find(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public Booking markCompleted(Long id) {
        Booking b = find(id);
        b.setStatus(BookingStatus.COMPLETED);

        if (b.getInvoice() != null) {
            b.getInvoice().setPaid(true);
            b.getInvoice().setStatus(InvoiceStatus.PAID);

            paymentService.autoPaymentFromInvoice(b.getInvoice(), "BOOK-" + id);
        }

        return repo.save(b);
    }


    @Transactional
    public Booking cancelBooking(Long id) {
        Booking b = find(id);
        b.setStatus(BookingStatus.CANCELLED);

        if (b.getInvoice() != null) {
            b.getInvoice().setStatus(InvoiceStatus.CANCELLED);
        }

        return repo.save(b);
    }

    @Transactional
    public void generateInvoice(Booking booking) {
        invoiceService.issueInvoice(booking);
    }
    @Transactional
    public Booking createFromRequest(BookingRequest req) {

        Customer customer = customerRepo.findById(req.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Equipment equipment = equipmentRepo.findById(req.getEquipmentId())
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        Booking b = new Booking();
        b.setCustomer(customer);
        b.setEquipment(equipment);
        b.setStartDate(req.getStartDate());
        b.setEndDate(req.getEndDate());
        b.setDurationType(DurationType.valueOf(req.getDurationType()));
        b.setStatus(BookingStatus.valueOf(req.getStatus()));

        Booking saved = repo.save(b);

        // ⭐ ALWAYS CREATE/UPDATE INVOICE
        invoiceService.issueInvoice(saved);

        return saved;
    }

    @Transactional
    public Booking updateFromRequest(Long id, BookingRequest req) {

        Booking ex = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (req.getCustomerId() != null) {
            Customer c = customerRepo.findById(req.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            ex.setCustomer(c);
        }

        if (req.getEquipmentId() != null) {
            Equipment e = equipmentRepo.findById(req.getEquipmentId())
                    .orElseThrow(() -> new RuntimeException("Equipment not found"));
            ex.setEquipment(e);
        }

        if (req.getStartDate() != null) ex.setStartDate(req.getStartDate());
        if (req.getEndDate() != null) ex.setEndDate(req.getEndDate());

        if (req.getDurationType() != null)
            ex.setDurationType(DurationType.valueOf(req.getDurationType()));

        if (req.getStatus() != null)
            ex.setStatus(BookingStatus.valueOf(req.getStatus()));

        Booking updated = repo.save(ex);

        // ⭐ RE-GENERATE INVOICE AFTER UPDATE
        invoiceService.issueInvoice(updated);

        return updated;
    }
    
    

}
