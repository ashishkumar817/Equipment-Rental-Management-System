package com.erms.controller;

import com.erms.model.Payment;
import com.erms.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAll();
    }

    @GetMapping("/my/{customerId}")
    public List<Payment> myPayments(@PathVariable Long customerId) {
        return paymentService.findByCustomerId(customerId);
    }

    @PostMapping
    public Payment add(@RequestBody Map<String, Object> body) {

        Long bookingId = Long.valueOf(body.get("bookingId").toString());
        BigDecimal amount = new BigDecimal(body.get("amount").toString());
        String tx = body.get("transactionRef").toString();

        return paymentService.addPayment(bookingId, amount, tx);
    }
}
