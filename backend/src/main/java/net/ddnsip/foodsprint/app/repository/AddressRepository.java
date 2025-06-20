package net.ddns_ip.foodsprint.app.repository;

import com.volosdine.restaurants.online.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
