package com.erms.repo;

import com.erms.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

	List<Payment> findByBooking_Customer_Id(Long customerId);

}
