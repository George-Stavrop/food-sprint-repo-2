package net.ddns_ip.foodsprint.app.request;

import com.volosdine.restaurants.online.model.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private Long restaurantId;
    private Address deliveryAddress;
}
