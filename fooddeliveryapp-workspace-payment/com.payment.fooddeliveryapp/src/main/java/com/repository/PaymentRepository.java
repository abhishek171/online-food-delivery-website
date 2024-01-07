package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{

	@Query(value = "Select * from payment where order_id=:orderId",nativeQuery = true)
	List<Payment> findPaymentDetailsById(@Param("orderId") long orderId );

	@Query(value = "Select * from payment where payment_id=:paymentId",nativeQuery = true)
	Payment findUserById(@Param("paymentId")long paymentId);

}
