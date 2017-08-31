package com.dhxa.bizcloud.appservice.controller.system;

import java.util.List;

import javax.transaction.Transactional;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.client.UserClient;
import com.dhxa.bizcloud.appservice.common.message.SystemErrorCodeType;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.User;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/user")
public class UserController {
	private Logger logger = LoggerFactory.getLogger(UserController.class);

	UserClient userClient;

	@Autowired
	public UserController(UserClient userClient) {
		this.userClient = userClient;
	}

	@RequestMapping(value = "getPageable", method = RequestMethod.GET)
	@CrossOrigin
	public Object getUserPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
			@RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
			@RequestParam(name = "userName", required = false) String userName) {
		logger.info("parameters:pageSize={},pageNumber={},userName={}", pageSize, pageNumber, userName);
		Subject subject = SecurityUtils.getSubject();
		logger.info("sessionid user=" + subject.getSession().getId());

		JSONObject jsonObject = userClient.getUserPageable(pageSize, pageNumber, userName);
		if (jsonObject.getBooleanValue("success")) {
			List<User> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(User.class);
			return ResponseUtil.makeSuccessResponse(rows);
		} else {
			return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
		}
		// return "abc";

	}

	@RequestMapping(value = "get", method = RequestMethod.GET)
	@CrossOrigin
	public Object getUserInfo(@RequestParam Long id) {
		logger.info("paras:id={}", id);
		JSONObject jsonObject = userClient.findUserById(id);
		if (jsonObject.getBooleanValue("success")) {
			List<User> rows = jsonObject.getJSONObject("result").getJSONArray("rows").toJavaList(User.class);
			return ResponseUtil.makeSuccessResponse(rows);
		} else {
			return ResponseUtil.makeErrorResponse(jsonObject.getString("errorCode"), jsonObject.getString("message"));
		}

	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	@Transactional
	@CrossOrigin
	public Object addUser(@RequestBody User date) {
		try {
			userClient.addUser(date);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED, e.getMessage() + "增加");

		}

	}

	@RequestMapping(value = "update", method = RequestMethod.PUT)
	@CrossOrigin
	public Object updateUser(@RequestBody User data) {
		try {
			userClient.updateUser(data);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED, e.getMessage() + "修改");
		}
	}

	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	@CrossOrigin
	public Object delUser(@RequestParam Long id) {
		try {
			userClient.deleteUser(id);
			return ResponseUtil.makeSuccessResponse();
		} catch (Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED, e.getMessage() + "删除");
		}
	}

}
