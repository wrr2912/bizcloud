package com.dhxa.bizcloud.appservice.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.entity.User;

@FeignClient("MICRO-SERVICE")
public interface UserClient {

    @RequestMapping(value="/user/findUserByUserName", method=RequestMethod.GET)
    public User findUserByUserName(@RequestParam("userName") String userName);
    
    @RequestMapping(value="/user/findUserById", method=RequestMethod.GET)
    public JSONObject findUserById(@RequestParam("id")Long id);

}