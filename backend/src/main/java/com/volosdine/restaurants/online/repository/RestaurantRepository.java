package com.volosdine.restaurants.online.repository;

import com.volosdine.restaurants.online.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Restaurant findByOwnerId(Long userId);
}
