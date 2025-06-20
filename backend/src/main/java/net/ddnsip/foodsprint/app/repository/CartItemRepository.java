package net.ddns_ip.foodsprint.app.repository;

import com.volosdine.restaurants.online.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
