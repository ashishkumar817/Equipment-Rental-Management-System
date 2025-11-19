package com.erms.service;

import com.erms.repo.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final BookingRepository bookingRepo;

    public boolean isAvailable(Long equipmentId, LocalDate start, LocalDate end) {

        // Get all bookings that overlap the new dates
        var overlaps = bookingRepo.findOverlapping(equipmentId, start, end);

        // If no overlapping bookings → available
        return overlaps.isEmpty();
    }
}
