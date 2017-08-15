package com.dhxa.bizcloud.appservice.sysadmin;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@EnableAutoConfiguration
public class LoginController {
	
	@RequestMapping("/login")
	@ResponseBody
    public String login(String userName,String password) {
        UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(userName,password);
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(usernamePasswordToken);   //完成登录
            subject.getPrincipal();
        } catch(Exception e) {
        	e.printStackTrace();
        	return "error";
        }
        
        return "success";        
    }
	
    @RequestMapping("/logout")
    @ResponseBody
    public String logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
//        session.removeAttribute("user");
        return "out";
    }

}
