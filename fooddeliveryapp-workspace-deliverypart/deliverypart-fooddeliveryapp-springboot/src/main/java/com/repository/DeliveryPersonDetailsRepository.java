package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.DeliveryPersonDetails;

public interface DeliveryPersonDetailsRepository extends JpaRepository<DeliveryPersonDetails, Long>{

	@Query(value = "Select * from deliveryperson where user_id=:userId",nativeQuery = true)
	DeliveryPersonDetails findByDeliveryPersonId(@Param("userId") String userId);

	@Query(value = "Select * from deliveryperson where user_id=:userId",nativeQuery = true)
	DeliveryPersonDetails findDeliveryPersonById(@Param("userId") String userId);

	@Query(value = "Select * from deliveryperson where contact_no=:contactNo",nativeQuery = true)
	DeliveryPersonDetails findDeliveryPersonByPhone(@Param("contactNo") long contactNo);

}
