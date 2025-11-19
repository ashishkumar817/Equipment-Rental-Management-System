package com.erms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long customerId;
    private Long equipmentId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String durationType; // DAILY/WEEKLY/MONTHLY
    private String status;       // optional string enum
}
