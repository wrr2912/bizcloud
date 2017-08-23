package com.dhxa.bizcloud.microservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dhxa.bizcloud.microservice.entity.User;
import com.dhxa.bizcloud.microservice.message.SystemErrorCodeType;
import com.dhxa.bizcloud.microservice.service.UserService;
import com.dhxa.bizcloud.microservice.utils.ResponseUtil;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

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
	
	@RequestMapping(value = "/findUserById")
	public Object findUserById(Long id){
		log.info("findUserById,id=" + id);
		try {
			User user =  this.userService.findUserById(id);
			List<User> result = new ArrayList<>();
			if(null != result) {
				result.add(user);
			}
			return ResponseUtil.makeSuccessResponse(result);
		}catch(Exception e) {
			System.out.println(e.toString());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
		}
		
		
	}
	
}
