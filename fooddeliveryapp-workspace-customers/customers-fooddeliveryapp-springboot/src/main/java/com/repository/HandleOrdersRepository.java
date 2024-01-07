package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.HandleOrders;

public interface HandleOrdersRepository extends JpaRepository<HandleOrders, Long>{

	@Query(value ="Select * from orders where customer_id=:customerId",nativeQuery=true)
	List<HandleOrders> findByCustomerId(@Param("customerId") long customerId);
	
	@Query(value="Select * from orders where hotel_id=:hotelId",nativeQuery=true)
	List<HandleOrders> findByHotelId(@Param("hotelId") long hotelId);

	@Query(value= "Select order_id from orders where hotel_id=:hotelId",nativeQuery=true)
	Long findOrderIdByHotelId(@Param("hotelId") long hotelId);
}
