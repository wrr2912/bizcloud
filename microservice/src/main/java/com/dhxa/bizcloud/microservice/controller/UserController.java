package com.dhxa.bizcloud.microservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import com.dhxa.bizcloud.microservice.service.UserService;

@RestController
@RequestMapping(value = "/user")
public class UserController {
	
	private Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/findUserByUserName")
	public Object findUserByUserName(String userName){
		log.info("findUserByUserName,userName=" + userName);
		return this.userService.findUserByUserName(userName);
	}
	
}
