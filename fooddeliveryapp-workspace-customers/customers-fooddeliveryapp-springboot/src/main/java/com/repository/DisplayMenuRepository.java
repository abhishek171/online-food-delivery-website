package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.DisplayMenu;

public interface DisplayMenuRepository extends JpaRepository<DisplayMenu, Long>{

	List<DisplayMenu> findByDishNameOrderByPriceAsc(String dishName);

	List<DisplayMenu> findByDishNameOrderByPriceDesc(String dishName);

	List<DisplayMenu> findByCategoriesOrderByPriceAsc(String categories);

	List<DisplayMenu> findByCategoriesOrderByPriceDesc(String categories);
	
}
