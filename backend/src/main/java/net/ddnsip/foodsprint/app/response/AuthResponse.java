package net.ddns_ip.foodsprint.app.response;

import com.volosdine.restaurants.online.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;
}
