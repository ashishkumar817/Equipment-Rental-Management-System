package com.erms.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentRequest {
    private Long bookingId;
    private BigDecimal amount;
}