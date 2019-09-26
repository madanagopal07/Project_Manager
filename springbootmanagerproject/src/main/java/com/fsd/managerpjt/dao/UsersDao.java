package com.fsd.managerpjt.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fsd.managerpjt.model.Users;
import com.fsd.managerpjt.repository.UsersRepository;

@Repository
public class UsersDao {
	
	@Autowired
	UsersRepository usersRepository;
	
	//insert the User
	public Users insertUser(Users user) {
		return usersRepository.save(user);
	}
	
	//get all the Users
	public List<Users> getAllUsers(){
		return usersRepository.findAll();
	}
	
	//get User by id
	public Optional<Users> getUserById(Long userid) {
		return usersRepository.findById(userid);
	}
	
	//get User by first name
	public Users getUserByUserName(String firstName) {
		return usersRepository.findUserByFirstName(firstName);
	}
	
	//delete the User
	public void deleteUser(Users user) {
		usersRepository.delete(user);
	}

}
