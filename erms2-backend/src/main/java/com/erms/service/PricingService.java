package com.erms.service;

import com.erms.model.Booking;
import com.erms.model.Equipment;
import com.erms.model.DurationType;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;

@Service
public class PricingService {

	private BigDecimal bd(Number n) {
	    return n == null ? BigDecimal.ZERO : new BigDecimal(n.toString());
	}


    public BigDecimal calculate(Equipment eq, Booking booking) {

        long days = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate()) + 1;

        if (booking.getDurationType() == null)
            booking.setDurationType(DurationType.DAILY);

        switch (booking.getDurationType()) {

            case DAILY:
                return bd(eq.getDailyRate()).multiply(BigDecimal.valueOf(days));

            case WEEKLY:
                long weeks = Math.max(1, (days + 6) / 7);
                return bd(eq.getWeeklyRate()).multiply(BigDecimal.valueOf(weeks));

            case MONTHLY:
                long months = Math.max(1, (days + 29) / 30);
                return bd(eq.getMonthlyRate()).multiply(BigDecimal.valueOf(months));

            default:
                return BigDecimal.ZERO;
        }
    }

    public BigDecimal tax(BigDecimal subtotal) {
        if (subtotal == null) return BigDecimal.ZERO;
        return subtotal.multiply(BigDecimal.valueOf(0.18)); // 18% GST
    }
}
