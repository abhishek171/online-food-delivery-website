package com.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.entity.AddMenu;
import com.request.AddMenuRequest;
import com.service.AddMenuService;

@RestController
@RequestMapping("/manageMenu/")
public class AddMenuController {
	
	@Autowired
	AddMenuService addMenuService;
	

	@CrossOrigin
	@PostMapping("addMenu")
	public String addMenu(@ModelAttribute AddMenuRequest addMenuRequest){
		return addMenuService.addMenu(addMenuRequest);
	}
	
	@CrossOrigin
	@PutMapping("updateMenu")
	public List<AddMenu> updateMenu(@RequestBody AddMenuRequest updateMenuRequest) {
		return addMenuService.updateMenu(updateMenuRequest);
	}
	
	@DeleteMapping("deleteMenuItem/{men_id}")
	public String deleteMenuItem(@PathVariable long menu_id) {
		return addMenuService.deleteMenuItem(menu_id);
	}
	
	@CrossOrigin
	@PostMapping("getMenu")
	public List<AddMenu> getMenusByHotelName(@RequestBody AddMenuRequest getMenu){
		return addMenuService.getMenusByHotelName(getMenu);
	}
	
	@CrossOrigin
	@GetMapping("getAllMenus")
	public List<AddMenu> getAllMenus(){
		return addMenuService.getAllMenus();
	}
	
	@CrossOrigin
	@GetMapping("getMenuBySearchValue")
	public List<AddMenu> getMenuBySearchValue(@RequestParam("searchTerm") String searchTerm){
		return addMenuService.getMenuBySearchValue(searchTerm);
	}
	
	@CrossOrigin
	@PostMapping("filterValues")
	public List<AddMenu> getMenusAfterFilter(@RequestBody Map<String,Object> filterData){
		 return addMenuService.getMenuAfterFilter(filterData);
	}
	
	@CrossOrigin
	@PostMapping("removeFilter")
	public List<AddMenu> getMenusByRemovingFilter(@RequestBody Map<String,Object> filters){
		return addMenuService.getMenusByRemovingFilter(filters);
	}
	
	@CrossOrigin
	@PostMapping("filterMenus")
	public List<AddMenu> getMenusByFilter(@RequestBody Map<String,Object> filterValue){
		return addMenuService.getMenusByFilter(filterValue);
	}
}
