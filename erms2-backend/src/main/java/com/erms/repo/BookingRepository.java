package com.erms.repo;

import com.erms.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // For availability check
    @Query("""
        SELECT b FROM Booking b 
        WHERE b.equipment.id = :equipmentId
          AND b.startDate <= :endDate
          AND b.endDate >= :startDate
    """)
    List<Booking> findOverlapping(
            @Param("equipmentId") Long equipmentId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // For UI display
    @Query("SELECT b FROM Booking b LEFT JOIN FETCH b.invoice LEFT JOIN FETCH b.customer LEFT JOIN FETCH b.equipment")
    List<Booking> findAllWithInvoice();

   
    List<Booking> findByCustomer_Id(Long customerId);


}
