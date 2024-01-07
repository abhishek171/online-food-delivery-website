package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long>{

	@Query(value = "Select * from orders where hotel_id=:hotel_id",nativeQuery = true)
	Orders findByHotelId(@Param("hotel_id") long hotel_id);

	@Query(value = "Select * from orders where order_status='notready' And hotel_id=:hotel_id",nativeQuery = true)
	List<Orders> findByHotelIdAndStatusNotReady(@Param("hotel_id") long hotel_id);

	@Query(value = "Select * from orders where hotel_id=:hotel_id",nativeQuery = true)
	List<Orders> getOrdersById(@Param("hotel_id")long hotel_id);

}
