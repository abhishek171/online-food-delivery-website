package com.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.entity.AddMenu;
import com.repository.AddMenuRepository;
import com.request.AddMenuRequest;
@Service
public class AddMenuService {
	
	@Autowired
	AddMenuRepository addMenuRepository;

	public String addMenu(AddMenuRequest addMenuRequst) {
		AddMenu addMenu = new AddMenu(addMenuRequst);
		
		AddMenu menu = addMenuRepository.save(addMenu);
		if(menu!=null) {
			return "menu Added Successfully";
		}else {
			return "Menu not added";
		}
	}

	public List<AddMenu> updateMenu(AddMenuRequest updateMenu) {
		
		System.out.println(updateMenu.getId());
		AddMenu existingMenuData = addMenuRepository.findById(updateMenu.getId()).orElse(null);
		if(existingMenuData == null) {
			return null;
		}else {
			long discount = 0;
			if(updateMenu.getHotel_name()!=null && !updateMenu.getHotel_name().isEmpty()) {
				
			     existingMenuData.setHotel_name(updateMenu.getHotel_name());
			}
			if(updateMenu.getDish_name()!=null && !updateMenu.getDish_name().isEmpty()) {
				existingMenuData.setDish_name(updateMenu.getDish_name()) ;
			}
			if(updateMenu.getDescription()!=null && !updateMenu.getDescription().isEmpty()) {
				existingMenuData.setDescription(updateMenu.getDescription());
			}
			if(updateMenu.getCategories()!=null && !updateMenu.getCategories().isEmpty()) {
				existingMenuData.setCategories(updateMenu.getCategories());
			}
			if(updateMenu.getDiscount()!=0) {
				existingMenuData.setDiscount(updateMenu.getDiscount());
				discount = existingMenuData.getDiscount();
			}
			if(updateMenu.getPrice()!=0) {
				if(discount == 0) {
					existingMenuData.setPrice(updateMenu.getPrice() - (updateMenu.getPrice()*existingMenuData.getDiscount()/100));
				}else {
					existingMenuData.setPrice(updateMenu.getPrice() - (updateMenu.getPrice()*discount/100));
				}
			}
			if(updateMenu.getCuisine()!=null && !updateMenu.getCuisine().isEmpty()) {
				existingMenuData.setCuisine(updateMenu.getCuisine());
			}
			if(updateMenu.getFoodType()!=null && !updateMenu.getFoodType().isEmpty()) {
				existingMenuData.setFoodType(updateMenu.getFoodType());
			}
			addMenuRepository.save(existingMenuData);
			return addMenuRepository.findByHotelName(existingMenuData.getHotel_name());
		}
	}
	
//	DELETE MENU ITEM

	public String deleteMenuItem(long menu_id) {
		addMenuRepository.deleteById(menu_id);
		return  "Menu Item Deleted SuccessFully";
	}

	public List<AddMenu> getMenusByHotelName(AddMenuRequest getMenu) {
		return addMenuRepository.findByHotelName(getMenu.getHotel_name());
	}

	public List<AddMenu> getAllMenus() {
		return addMenuRepository.findAll();
	}

	public List<AddMenu> getMenuBySearchValue(String searchTerm) {
		return addMenuRepository.getMenuBySearchValue(searchTerm);
	}

	public List<AddMenu> getMenuAfterFilter(Map<String, Object> filterData) {
		String searchTerm = (String) filterData.get("searchValue");
		System.out.println(searchTerm);
		ArrayList<String> filterValue = (ArrayList<String>) filterData.get("filterApplied");

		if(filterValue.contains("min")) {
			if (filterValue.contains("veg") && filterValue.contains("range100-300")) {
				return addMenuRepository.getMenusByAllThreeFilters(searchTerm);
			}else if(filterValue.contains("veg") && filterValue.contains("range300-800")) {
				return addMenuRepository.getMenusByAllThreeFilterValues(searchTerm);
			}else if(filterValue.contains("veg")) {
				return addMenuRepository.getMenusByTwoFilters(searchTerm);
			}else if(filterValue.contains("range100-300")) {
				List<AddMenu> value = addMenuRepository.getMenusByTwoFilterMinANdRange100_300(searchTerm);
				System.out.println(value);
				return value;
			}else if(filterValue.contains("range300-800")) {
				return addMenuRepository.getMenusByTwoFilterMinANdRange300_800(searchTerm);
			}else {
				return addMenuRepository.getMenusByOneFilterMin(searchTerm);
			}
		}else if(filterValue.contains("max")) {
			if (filterValue.contains("veg") && filterValue.contains("range100-300")) {
				return addMenuRepository.getMenusByAllThreeFiltersMax(searchTerm);
			}else if(filterValue.contains("veg") && filterValue.contains("range300-800")) {
				return addMenuRepository.getMenusByAllThreeFilterValuesMax(searchTerm);
			}else if(filterValue.contains("veg")) {
				return addMenuRepository.getMenusByMaxAndVeg(searchTerm);
			}else if(filterValue.contains("range100-300")) {
				return addMenuRepository.getMenusByMaxAndRange100_300(searchTerm);
			}else if(filterValue.contains("range300-800")) {
				return addMenuRepository.getMenusByMaxAndRange300_800(searchTerm);
			}else {
				return addMenuRepository.getMenusByOnFilterMax(searchTerm);
			}
		}else if(filterValue.contains("veg")) {
			if(filterValue.contains("range100-300")) {
				return addMenuRepository.getMenusByVegAndRange100_300(searchTerm);
			}else if(filterValue.contains("range300-800")) {
				return addMenuRepository.getMenusByVegAndRang300_800(searchTerm);
			}else {
				return addMenuRepository.getMenusByOneFilterVeg(searchTerm);
			}
		}else if(filterValue.contains("range100-300")) {
			return addMenuRepository.getMenusRange100_300(searchTerm);
		}else if(filterValue.contains("range300-800")) {
			return addMenuRepository.getMenusRange300_800(searchTerm);
		}
		return null;
	}

	public List<AddMenu> getMenusByRemovingFilter(Map<String, Object> filters) {
		ArrayList <String> filterData = (ArrayList<String>) filters.get("filterApplied");
		if(filterData.contains("min")) {
			if(filterData.contains("veg")) {
				return addMenuRepository.findByFoodTypeOrderByPriceAsc("Veg");
			}else if(filterData.contains("range100-300")) {
				return addMenuRepository.findByPriceBetweenOrderByPriceAsc(100,300);
			}else if(filterData.contains("range300-800")) {
				return addMenuRepository.findByPriceBetweenOrderByPriceAsc(300,800);
			}else {
				return addMenuRepository.findAllByOrderByPriceAsc();
			}
		}else if(filterData.contains("max")) {
			if(filterData.contains("veg")) {
				return addMenuRepository.findByFoodTypeOrderByPriceDesc("Veg");
			}else if(filterData.contains("range100-300")) {
				return addMenuRepository.findByPriceBetweenOrderByPriceDesc(100,300);
			}else if(filterData.contains("range300-800")) {
				return addMenuRepository.findByPriceBetweenOrderByPriceDesc(300,800);
			}else {
				return addMenuRepository.findAllByOrderByPriceDesc();
			}
		}else if(filterData.contains("veg")) {
			if(filterData.contains("range100-300")) {
				return addMenuRepository.findByFoodTypeAndPriceBetween("Veg",100,300);
			}else if(filterData.contains("range300-800")) {
				return addMenuRepository.findByFoodTypeAndPriceBetween("Veg",300,800);
			}else {
				return addMenuRepository.findByFoodType("Veg");
			}
		}else if(filterData.contains("range100-300")) {
			return addMenuRepository.findByPriceBetween(100,300);
		}else if(filterData.contains("range300-800")) {
			return addMenuRepository.findByPriceBetween(300,800);
		}
		return null;
	}

	public List<AddMenu> getMenusByFilter(Map<String, Object> filterValue) {
		ArrayList <String> filterData = (ArrayList<String>) filterValue.get("filterApplied");
		if(filterData.contains("min")) {
			if (filterData.contains("veg") && filterData.contains("range100-300")) {
				return addMenuRepository.findByFoodTypeAndPriceBetweenOrderByPriceAsc("Veg",100,300);
			}else if(filterData.contains("veg") && filterData.contains("range300-800")) {
				return addMenuRepository.findByFoodTypeAndPriceBetweenOrderByPriceAsc("Veg",300,800);
			}else if(filterData.contains("veg")) {
				return addMenuRepository.findByFoodTypeOrderByPriceAsc("Veg");
			}else if(filterData.contains("range100-300")) {
				return addMenuRepository.findByPriceBetweenOrderByPriceAsc(100,300);
			}else if(filterData.contains("range300-800")) {
				return addMenuRepository.findByPriceBetweenOrderByPriceAsc(300,800);
			}else {
				return addMenuRepository.findAllByOrderByPriceAsc();
			}
		}else if(filterData.contains("max")) {
			if (filterData.contains("veg") && filterData.contains("range100-300")) {
				return addMenuRepository.findByFoodTypeAndPriceBetweenOrderByPriceDesc("Veg",100,300);
			}else if(filterData.contains("veg") && filterData.contains("range300-800")) {
				return addMenuRepository.findByFoodTypeAndPriceBetweenOrderByPriceDesc("Veg",300,800);
			}else if(filterData.contains("veg")) {
				return addMenuRepository.findByFoodTypeOrderByPriceDesc("Veg");
			}else if(filterData.contains("range100-300")) {
				return addMenuRepository.findByPriceBetweenOrderByPriceDesc(100,300);
			}else if(filterData.contains("range300-800")) {
				return addMenuRepository.findByPriceBetweenOrderByPriceDesc(300,800);
			}else {
				return addMenuRepository.findAllByOrderByPriceDesc();
			}
		}else if(filterData.contains("veg")) {
			if(filterData.contains("range100-300")) {
				return addMenuRepository.findByFoodTypeAndPriceBetween("Veg",100,300);
			}else if(filterData.contains("range300-800")) {
				return addMenuRepository.findByFoodTypeAndPriceBetween("Veg",300,800);
			}else {
				return addMenuRepository.findByFoodType("Veg");
			}
		}else if(filterData.contains("range100-300")) {
			return addMenuRepository.findByPriceBetween(100,300);
		}else if(filterData.contains("range300-800")) {
			return addMenuRepository.findByPriceBetween(300,800);
		}
		return null;
	}

}
