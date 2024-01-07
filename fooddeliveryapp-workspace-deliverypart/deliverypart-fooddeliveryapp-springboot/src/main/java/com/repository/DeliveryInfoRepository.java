package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.DeliveryInfo;

public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Long>{

	@Query(value = "Select * from table where delivery_id=:id",nativeQuery = true)
	DeliveryInfo findDeliveryInfoById(@Param("id") long id);

	@Query(value = "Select * from table where deliveryperson_id=:deliveryPersonId AND delivery_status='not delivered'",nativeQuery = true)
	List<DeliveryInfo> getUndeliveredOrderInfo(long deliveryPersonId);
}
