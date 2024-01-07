package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.AddMenu;


public interface AddMenuRepository extends JpaRepository<AddMenu, Long>{

	@Query(value = "Select * from menu where hotel_name=:hotel_name",nativeQuery = true)
	List<AddMenu> findByHotelName(@Param("hotel_name") String hotel_name);

	@Query(value="SELECT * FROM menu WHERE REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') OR  REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')", nativeQuery=true)
	List<AddMenu> getMenuBySearchValue(@Param("searchTerm") String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND LOWER(food_type) = LOWER('Veg') "
	        + "AND price BETWEEN 100 AND 300 "
	        + "ORDER BY price ASC", nativeQuery = true)
	List<AddMenu> getMenusByAllThreeFilters(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND LOWER(food_type) = LOWER('Veg') "
	        + "AND price BETWEEN 300 AND 800 "
	        + "ORDER BY price ASC", nativeQuery = true)
	List<AddMenu> getMenusByAllThreeFilterValues(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND LOWER(food_type) = LOWER('Veg') "
	        + "ORDER BY price ASC", nativeQuery = true)
	List<AddMenu> getMenusByTwoFilters(@Param("searchTerm")String searchTerm);
	
	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND price BETWEEN 100 AND 300 "
	        + "ORDER BY price ASC", nativeQuery = true)
	List<AddMenu> getMenusByTwoFilterMinANdRange100_300(@Param("searchTerm") String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND price BETWEEN 300 AND 800 "
	        + "ORDER BY price ASC", nativeQuery = true)
	List<AddMenu> getMenusByTwoFilterMinANdRange300_800(@Param("searchTerm") String searchTerm);
	
	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "ORDER BY price ASC", nativeQuery = true)

	List<AddMenu> getMenusByOneFilterMin(@Param("searchTerm")String searchTerm);
	
	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND LOWER(food_type) = LOWER('Veg') "
	        + "AND price BETWEEN 100 AND 300 "
	        + "ORDER BY price DESC", nativeQuery = true)
	
	List<AddMenu> getMenusByAllThreeFiltersMax(@Param("searchTerm")String searchTerm);
	
	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND LOWER(food_type) = LOWER('Veg') "
	        + "AND price BETWEEN 300 AND 800 "
	        + "ORDER BY price DESC", nativeQuery = true)
	List<AddMenu> getMenusByAllThreeFilterValuesMax(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND LOWER(food_type) = LOWER('Veg') "
	        + "ORDER BY price DESC", nativeQuery = true)
	List<AddMenu> getMenusByMaxAndVeg(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND price BETWEEN 100 AND 300 "
	        + "ORDER BY price DESC", nativeQuery = true)
	List<AddMenu> getMenusByMaxAndRange100_300(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND price BETWEEN 300 AND 800 "
	        + "ORDER BY price DESC", nativeQuery = true)
	List<AddMenu> getMenusByMaxAndRange300_800(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "ORDER BY price DESC", nativeQuery = true)
	List<AddMenu> getMenusByOnFilterMax(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND LOWER(food_type) = LOWER('Veg') "
	        + "AND price BETWEEN 100 AND 300 ", nativeQuery = true)
	List<AddMenu> getMenusByVegAndRange100_300(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND LOWER(food_type) = LOWER('Veg') "
	        + "AND price BETWEEN 300 AND 800 ", nativeQuery = true)
	List<AddMenu> getMenusByVegAndRang300_800(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND LOWER(food_type) = LOWER('Veg') ", nativeQuery = true)
	List<AddMenu> getMenusByOneFilterVeg(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND price BETWEEN 100 AND 300 ", nativeQuery = true)
	List<AddMenu> getMenusRange100_300(@Param("searchTerm")String searchTerm);

	@Query(value = "SELECT * FROM menu WHERE "
	        + "(REPLACE(LOWER(hotel_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(dish_name), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(categories), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(cuisine), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '') "
	        + "OR REPLACE(LOWER(food_type), ' ', '') = REPLACE(LOWER(:searchTerm), ' ', '')) "
	        + "AND price BETWEEN 300 AND 800 ", nativeQuery = true)
	List<AddMenu> getMenusRange300_800(@Param("searchTerm")String searchTerm);

	List<AddMenu> findByFoodTypeAndPriceBetweenOrderByPriceAsc(String string, int i, int j);
	
	List<AddMenu> findByFoodTypeOrderByPriceAsc(String string);

	List<AddMenu> findByPriceBetweenOrderByPriceAsc(int i, int j);
	
	List<AddMenu> findAllByOrderByPriceAsc();

	List<AddMenu> findByFoodTypeAndPriceBetweenOrderByPriceDesc(String string, int i, int j);
	
	List<AddMenu> findByFoodTypeOrderByPriceDesc(String string);

	List<AddMenu> findByPriceBetweenOrderByPriceDesc(int i, int j);

	List<AddMenu> findAllByOrderByPriceDesc();

	List<AddMenu> findByFoodTypeAndPriceBetween(String string, int i, int j);
	
	List<AddMenu> findByFoodType(String string);

	List<AddMenu> findByPriceBetween(int i, int j);


	

	

	

	

	
}
