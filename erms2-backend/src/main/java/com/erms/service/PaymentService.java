package com.erms.service;

import com.erms.model.Booking;
import com.erms.model.Invoice;
import com.erms.model.Payment;
import com.erms.model.PaymentStatus;
import com.erms.repo.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repo;

    // ⭐ CREATE PAYMENT (admin/manual)
    @Transactional
    public Payment addPayment(Long bookingId, BigDecimal amount, String transactionRef) {

        Payment p = new Payment();
        Booking booking = new Booking();
        booking.setId(bookingId);
        p.setBooking(booking);

        p.setAmount(amount);
        p.setStatus(PaymentStatus.PAID);
        p.setTransactionRef(transactionRef);
        p.setTimestamp(LocalDateTime.now());

        return repo.save(p);
    }

    // ⭐ AUTO PAYMENT FROM INVOICE
    @Transactional
    public Payment autoPaymentFromInvoice(Invoice invoice, String ref) {

        Payment p = new Payment();
        p.setBooking(invoice.getBooking());
        p.setAmount(invoice.getTotal());
        p.setStatus(PaymentStatus.PAID);
        p.setTransactionRef(ref);
        p.setTimestamp(LocalDateTime.now());

        return repo.save(p);
    }

    // ⭐ ADMIN — Get all payments
    public List<Payment> getAll() {
        return repo.findAll();
    }

    // ⭐ USER — Get payments for a customer
    public List<Payment> findByCustomerId(Long customerId) {
        return repo.findByBooking_Customer_Id(customerId);
    }
}
