package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.Admin;
import com.entity.AdminDetails;

public interface AdminRepository extends JpaRepository<Admin, Long>{

	@Query(value = "Select * from admininfo where admin_username=:userName",nativeQuery = true)
	Admin findByUserName(@Param("userName") String userName);

	@Query(value = "Select * from adminpaymentdata where admin_id=:admin_id",nativeQuery = true)
	Admin findByAdminId(@Param("admin_id") long admin_id);

	@Query(value = "Select * from admininfo where admin_id=:adminId",nativeQuery = true)
	AdminDetails findByAdminById(@Param("adminId")long adminId);
}
