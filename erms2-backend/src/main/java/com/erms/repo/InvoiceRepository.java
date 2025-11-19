package com.erms.repo;

import com.erms.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    @Query("SELECT i FROM Invoice i WHERE i.booking.id = :bookingId")
    Optional<Invoice> findByBookingId(@Param("bookingId") Long bookingId);

    @Query("""
        SELECT i FROM Invoice i
        WHERE i.booking.customer.id = :customerId
    """)
    List<Invoice> findByBooking_Customer_Id(Long customerId);
}
