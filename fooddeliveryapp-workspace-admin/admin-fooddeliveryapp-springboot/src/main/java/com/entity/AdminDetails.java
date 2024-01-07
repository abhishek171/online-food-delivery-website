package com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.request.AdminDetailsRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "admininfo")
public class AdminDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "admin_id")
	private long admin_id;
	
	@Column(name = "admin_username")
	private String adminUsername;
	
	@JsonIgnore
	@Column(name = "admin_password")
	private String adminPassword;
	
	@Column(name = "profile_pic")
	private String profilePic;

	public AdminDetails() {
		super();
	}

	public AdminDetails (AdminDetailsRequest adminDetailsRequest) {
		this.adminUsername = adminDetailsRequest.getAdminUsername();
		this.adminPassword = adminDetailsRequest.getAdminPassword();
		this.profilePic = adminDetailsRequest.getImageName();
	}
	
	public long getAdmin_id() {
		return admin_id;
	}

	public void setAdmin_id(long admin_id) {
		this.admin_id = admin_id;
	}

	public String getAdminUsername() {
		return adminUsername;
	}

	public void setAdminUsername(String adminUsername) {
		this.adminUsername = adminUsername;
	}

	public String getAdminPassword() {
		return adminPassword;
	}

	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	@Override
	public String toString() {
		return "AdminDetails [admin_id=" + admin_id + ", adminUsername=" + adminUsername + ", adminPassword="
				+ adminPassword + ", profilePic=" + profilePic + "]";
	}
}
