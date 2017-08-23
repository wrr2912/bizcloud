package com.dhxa.bizcloud.microservice.service;

import org.springframework.stereotype.Service;

import com.dhxa.bizcloud.microservice.entity.User;
import com.dhxa.bizcloud.microservice.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service("userService")
public class UserService {

	 @Autowired
	 private IUserRepository userRepository;
	 
	 public User findUserByUserName(String userName){
		 return this.userRepository.findUserByUserName(userName);		 
	 }
	 
	 public User findUserById(Long id) {
		 return this.userRepository.findOne(id);
	 }
	 
}
