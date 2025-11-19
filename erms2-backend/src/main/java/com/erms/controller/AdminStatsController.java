package com.erms.controller;

import com.erms.repo.CustomerRepository;
import com.erms.repo.EquipmentRepository;
import com.erms.repo.BookingRepository;
import com.erms.repo.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminStatsController {

    private final CustomerRepository customers;
    private final EquipmentRepository equipment;
    private final BookingRepository bookings;
    private final PaymentRepository payments;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalCustomers", customers.count());
        stats.put("totalEquipment", equipment.count());
        stats.put("totalBookings", bookings.count());

        BigDecimal revenue = payments.findAll().stream()
                .map(p -> p.getAmount() == null ? BigDecimal.ZERO : p.getAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        stats.put("totalRevenue", revenue);

        return stats;
    }
}
