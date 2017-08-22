package com.dhxa.bizcloud.appservice.controller.sysadmin;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@EnableAutoConfiguration
public class SysAdminController {
	
	@RequestMapping("/index")
	@ResponseBody
    public String index() {	
		Subject subject = SecurityUtils.getSubject();
		return "index,userName=" + subject.getPrincipal();
	}

}
