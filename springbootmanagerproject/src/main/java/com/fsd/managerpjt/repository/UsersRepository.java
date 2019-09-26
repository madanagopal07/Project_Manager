package com.fsd.managerpjt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fsd.managerpjt.model.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
	
	@Query(value = "SELECT * FROM users WHERE first_name = ?1", nativeQuery = true)
	public Users findUserByFirstName(String firstName);
}
