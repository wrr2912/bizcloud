package com.dhxa.bizcloud.appservice.controller.sysadmin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dhxa.bizcloud.appservice.client.UserClient;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.User;

@Controller
@EnableAutoConfiguration
public class LoginController {
	
	private Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	private UserClient userClient;	
	@RequestMapping(value = "/login")
	@CrossOrigin
	@ResponseBody
	public Object login(@RequestParam String userName, @RequestParam String password) {
		logger.info("login userName=" + userName + "password=" + password );
	
		User user = userClient.findUserByUserName(userName);
		logger.info("user getUserid=" + user.getUserid() );
		
	    UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(userName,password);
	    Subject subject = SecurityUtils.getSubject();
	    try {
	        subject.login(usernamePasswordToken);   //完成登录
	        Map<String, Object> result = new HashMap<>();
			result.put("user", subject.getPrincipal());
			result.put("sessionid", subject.getSession().getId());
	        logger.info("subject.getPrincipal()=" + subject.getPrincipal() + ",sessionid=" + subject.getSession().getId());
	        return ResponseUtil.makeSuccessResponse(result);
	    }catch(UnknownAccountException uaex){
	    	return ResponseUtil.makeErrorResponse(uaex.toString(),"用户不存在");
		}catch(IncorrectCredentialsException icex){
			return ResponseUtil.makeErrorResponse(icex.toString(),"用户名或密码错误");
		}catch(LockedAccountException uaex){
			return ResponseUtil.makeErrorResponse(uaex.toString(),"用户锁定");
		}catch(AuthenticationException uaex){
			return ResponseUtil.makeErrorResponse(uaex.toString(),"用户登录异常");
	    } catch(Exception e) {
	    	return ResponseUtil.makeErrorResponse(e.toString(),"登录失败");
	    }
	
    }
	
    @RequestMapping("/logout")
    @CrossOrigin
    @ResponseBody
    public Object logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
      //  return Response.success("logout");
        return ResponseUtil.makeSuccessResponse();
    }

}
