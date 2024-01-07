package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.HotelDetailsFuture;

public interface HotelDetailFutureRepository extends JpaRepository<HotelDetailsFuture, Long>{
	
	@Query(value = "Select * from hotelfutureusedata where user_id=:user_id",nativeQuery = true)
	Object findByUserId(@Param("user_id") String user_id);

}
