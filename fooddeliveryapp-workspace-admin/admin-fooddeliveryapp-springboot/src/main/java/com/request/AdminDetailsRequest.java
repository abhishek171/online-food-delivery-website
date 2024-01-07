
package com.request;

import java.io.File;
import java.io.IOException;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

public class AdminDetailsRequest {
	private static final String folderPath = "C:/Users/abhis/OneDrive/Desktop/fooddeliveryapp-frontend/online-food-delivery-app/public/image/admin-image/";
	private long adminId;
    private String adminUsername;
    private String adminPassword;
    private MultipartFile profilePic;
    private String imageName;

    public long getAdminId() {
		return adminId;
	}

	public void setAdminId(long adminId) {
		this.adminId = adminId;
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

    public void setAdminPassword(String adminPassword){
       this.adminPassword = adminPassword;
    }

	public MultipartFile getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(MultipartFile profilePic) {
		this.profilePic = profilePic;
		setImageName(this.profilePic);
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(MultipartFile profileImage) {
		this.imageName = StringUtils.cleanPath(profileImage.getOriginalFilename());
		try {
			profileImage.transferTo(new File(folderPath+this.imageName));
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}
	}

	

}
