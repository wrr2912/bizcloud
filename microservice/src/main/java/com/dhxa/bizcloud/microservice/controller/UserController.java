package com.dhxa.bizcloud.microservice.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.dhxa.bizcloud.microservice.repository.IUserRepository;
import com.dhxa.bizcloud.microservice.service.UserService;

@RestController
@RequestMapping(value = "/user")
public class UserController {
	
	private Logger log = Logger.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/findUserByUserName")
	public Object findUserByUserName(String userName){
		log.info("findUserByUserName,userName=" + userName);
		return this.userService.findUserByUserName(userName);
	}
	
}
