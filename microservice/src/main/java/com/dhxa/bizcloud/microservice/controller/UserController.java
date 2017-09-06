package com.dhxa.bizcloud.microservice.controller;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.dhxa.bizcloud.microservice.entity.User;
import com.dhxa.bizcloud.microservice.service.UserService;
import com.dhxa.bizcloud.microservice.utils.ResponseUtil;
import com.dhxa.bizcloud.microservice.message.SystemErrorCodeType;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/user")
public class UserController {

	private Logger log = LoggerFactory.getLogger(UserController.class);

	@RequestMapping(value = "getPageable", method = RequestMethod.GET)
	@CrossOrigin
	public Object getDeptsPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
			@RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(name = "userName", required = false) String userName) {
		log.info("parameters:pageSize={},pageNumber={},userName={}", pageSize, pageNumber, userName);
		try {
			Page<User> result = userService.findPageable(pageSize, pageNumber - 1, userName);
			return ResponseUtil.makeSuccessResponse(result.getTotalElements(), result.getContent());
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
		}
		// return apiClient.getDeptPageable(pageSize,pageNumber,name);
	}

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/findUserByUserName")
	public Object findUserByUserName(String userName) {
		log.info("findUserByUserName,userName=" + userName);
		return this.userService.findUserByUserName(userName);
	}

	@RequestMapping(value = "/findUserById")
	public Object findUserById(Long id) {
		log.info("findUserById,id=" + id);
		try {
			User user = this.userService.findUserById(id);
			List<User> result = new ArrayList<>();
			if (null != result) {
				result.add(user);
			}
			return ResponseUtil.makeSuccessResponse(result);
		} catch (Exception e) {
			System.out.println(e.toString());
			throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
		}

	}

	@RequestMapping(value = "get", method = RequestMethod.GET)
	@CrossOrigin
	public Object getUser(@RequestParam Long id) {
		log.info("paras:id={}", id);
		try {
			List<User> result = new ArrayList<>();
			User info = userService.findOne(id);
			if (null != result) {
				result.add(info);
			}
			log.info("user-get result:=[{}],{}", id, (info != null) ? info.toString() : "");
			return ResponseUtil.makeSuccessResponse(result.size(), result);
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
		}
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	@Transactional
	@CrossOrigin
	public Object addUser(@RequestBody User date) {
		try {
			userService.save(date);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED, e.getMessage() + "用户增加");
		}
	}

	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@CrossOrigin
	public Object updateUser(@RequestBody User date) {
		try {
			User user = userService.findOne(date.getUserid());
			user.setDeptId(date.getDeptId());
			user.setEmail(date.getEmail());
			user.setIsdelete(date.getIsdelete());
			user.setPassword(date.getPassword());
			user.setHeadimgurl(date.getHeadimgurl());
			user.setPhone(date.getPhone());
			user.setTruename(date.getTruename());

			userService.save(user);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED, "修改");
		}
	}

	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	@CrossOrigin
	public Object delUser(@RequestParam Long id) {
		try {
			userService.delete(id);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED, "删除");
		}
	}

}
