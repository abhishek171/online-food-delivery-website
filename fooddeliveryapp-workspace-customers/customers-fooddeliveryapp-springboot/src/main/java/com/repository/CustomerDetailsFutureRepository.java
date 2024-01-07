package com.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.CustomerDetailsFuture;


public interface CustomerDetailsFutureRepository extends JpaRepository<CustomerDetailsFuture, Long> {
	
	@Query(value = "select * from customerfutureusedata where customer_phone = :custPhone",nativeQuery = true)
	Integer searchByPhoneNo(@Param("custPhone") BigInteger custPhone);


}
