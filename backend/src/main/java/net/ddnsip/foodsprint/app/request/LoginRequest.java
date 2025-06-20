package net.ddns_ip.foodsprint.app.request;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;

    private String password;
}
