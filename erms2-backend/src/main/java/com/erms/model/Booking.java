// com/erms/model/Booking.java
package com.erms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "bookings",
       indexes = @Index(name = "idx_equipment_date", columnList = "equipment_id,startDate,endDate"))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Owner: customer
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Customer customer;

    // Owner: equipment
    @ManyToOne
    @JoinColumn(name = "equipment_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Equipment equipment;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private DurationType durationType;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.PENDING;

    // Invoice: Invoice owns the FK (booking_id). Booking mappedBy invoice.
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Invoice invoice;

    // Payments for this booking
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Payment> payments;

    // Transient computed total (serialized as computedTotal)
    @Transient
    @JsonProperty("computedTotal")
    public BigDecimal getComputedTotal() {
        if (this.invoice != null && this.invoice.getTotal() != null) {
            return this.invoice.getTotal();
        }
        return null;
    }
 // Transient fields for frontend (customerId, equipmentId)
    @Transient
    private Long customerId;
    
    @Transient
    private Double totalAmount;

    @Transient
    private Long equipmentId;

}
