package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.entity.DeliveryInfo;

public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Long> {

	@Query(value = "Select * from deliveryinfo where delivery_status ='delivered'",nativeQuery = true)
	List<DeliveryInfo> getAllOrdersDelivered();
}
