package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.HotelAddress;

public interface HotelAddressRepository extends JpaRepository<HotelAddress, Long>{

}
