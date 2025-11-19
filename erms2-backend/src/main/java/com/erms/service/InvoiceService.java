package com.erms.service;

import com.erms.model.Booking;
import com.erms.model.Invoice;
import com.erms.model.InvoiceStatus;
import com.erms.repo.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository repo;
    private final PaymentService paymentService;

    // ---------------- ALL INVOICES ----------------
    public List<Invoice> getAll() {
        return repo.findAll();
    }

    // ---------------- FIND ONE ----------------
    public Invoice find(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    // ---------------- ISSUE or UPDATE INVOICE ----------------
    @Transactional
    public Invoice issueInvoice(Booking booking) {

        Invoice inv = repo.findByBookingId(booking.getId())
                .orElse(new Invoice());

        inv.setBooking(booking);
        inv.setInvoiceDate(LocalDateTime.now());

        // ⭐ CALCULATE PRICE
        long days = java.time.temporal.ChronoUnit.DAYS.between(
                booking.getStartDate(), booking.getEndDate());

        BigDecimal total = booking.getEquipment().getDailyRate()
                .multiply(BigDecimal.valueOf(days));

        inv.setTotal(total);
        inv.setStatus(InvoiceStatus.UNPAID);
        inv.setPaid(false);

        return repo.save(inv);
    }

    // ---------------- MARK PAID ----------------
    @Transactional
    public Invoice markPaid(Long id) {
        Invoice inv = find(id);

        if (inv.isPaid()) return inv;

        inv.setPaid(true);
        inv.setStatus(InvoiceStatus.PAID);

        paymentService.autoPaymentFromInvoice(
                inv,
                "TXN-" + System.currentTimeMillis()
        );

        return repo.save(inv);
    }

    // ---------------- MY INVOICES (USER) ----------------
    public List<Invoice> getByCustomer(Long customerId) {
        return repo.findByBooking_Customer_Id(customerId);
    }
    public List<Invoice> findByCustomerId(Long customerId) {
        return repo.findByBooking_Customer_Id(customerId);
    }

}
