package net.ddns_ip.foodsprint.app.request;

import com.volosdine.restaurants.online.model.Category;
import com.volosdine.restaurants.online.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class CreateFoodRequest {
    private String name;
    private String description;
    private Long price;
    private Category category;
    private List<String> images;
    private Long restaurantId;
    private List<IngredientsItem> ingredients;
}
