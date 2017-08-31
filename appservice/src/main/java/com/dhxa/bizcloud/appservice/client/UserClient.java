package com.dhxa.bizcloud.appservice.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.entity.User;

@FeignClient("MICRO-SERVICE")
public interface UserClient {

	@RequestMapping(value = "/user/findUserByUserName", method = RequestMethod.GET)
	public User findUserByUserName(@RequestParam("userName") String userName);

	@RequestMapping(value = "/user/findUserById", method = RequestMethod.GET)
	public JSONObject findUserById(@RequestParam("id") Long id);

	@RequestMapping(method = { RequestMethod.POST }, value = "/user/add")
	JSONObject addUser(@RequestBody User user);

	@RequestMapping(method = { RequestMethod.PUT }, value = "/user/update")
	JSONObject updateUser(@RequestBody User user);

	@RequestMapping(method = { RequestMethod.DELETE }, value = "user/delete")
	JSONObject deleteUser(@RequestParam(name = "id") Long id);

	@RequestMapping(method = { RequestMethod.GET }, value = "user/get")
	JSONObject findUserById(@RequestBody User user);

	@RequestMapping(method = { RequestMethod.GET }, value = "/user/getPageable")
	JSONObject getUserPageable(@RequestParam(name = "pageSize") int pageSize,
			@RequestParam(name = "pageNumber") int pageNumber,
			@RequestParam(name = "userName", required = false) String userName);
}