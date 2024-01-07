package com.repository;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.CustomerDetails;


public interface CustomerDetailsRepository extends JpaRepository<CustomerDetails, Long> {
	
	@Query(value = "select * from customer where customer_phone = :custPhone",nativeQuery = true)
	Integer searchByPhoneNo(@Param("custPhone") BigInteger custPhone);
	
	CustomerDetails findUserByCustPhone(@Param("phoneNo") BigInteger phoneNo);

	List<CustomerDetails> findByCustomerId(long customerId);
	
}
