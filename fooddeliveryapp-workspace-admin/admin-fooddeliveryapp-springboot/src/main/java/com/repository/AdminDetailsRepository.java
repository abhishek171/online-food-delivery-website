package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.AdminDetails;

public interface AdminDetailsRepository extends JpaRepository<AdminDetails, Long>{
		
		@Query(value = "Select * from admininfo where admin_username=:adminUsername",nativeQuery = true)
		AdminDetails findAdminDetailsByUserName(@Param("adminUsername") String adminUsername);

		@Query(value = "Select * from admininfo where admin_id=:adminId",nativeQuery = true)
		AdminDetails findByAdminId(@Param("adminId") long adminId);

}
