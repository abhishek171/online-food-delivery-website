package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.HotelDetail;

public interface HoteldetailRepository extends JpaRepository<HotelDetail, Long>{

	@Query(value = "Select * from hoteldetails where user_id=:user_id",nativeQuery = true)
	HotelDetail findByUserId(@Param("user_id")String user_id);

	@Query(value="Select hotel_id from hoteldetails where hotel_name=:hotel_name",nativeQuery=true)
	Integer getIdByHotelName(@Param("hotel_name")String hotel_name);
	

	
}
