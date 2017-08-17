package com.dhxa.bizcloud.microservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.dhxa.bizcloud.microservice.repository.IUserRepository;
import com.dhxa.bizcloud.microservice.service.UserService;

@RestController
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/findUserByUserName")
	public Object findUserByUserName(String userName){
		return this.userService.findUserByUserName(userName);
	}
	
}
