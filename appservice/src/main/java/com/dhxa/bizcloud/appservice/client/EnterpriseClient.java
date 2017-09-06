package com.dhxa.bizcloud.appservice.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.entity.Enterprise;

@FeignClient(name = "MICRO-SERVICE")
public interface EnterpriseClient {
	@RequestMapping(method = { RequestMethod.POST }, value = "/enterprise/add")
    JSONObject addEnterprise(@RequestBody Enterprise enterprise);

    @RequestMapping(method = { RequestMethod.PUT }, value = "/enterprise/update")
    JSONObject updateEnterprise(@RequestBody Enterprise enterprise);

    @RequestMapping(method = { RequestMethod.DELETE }, value = "/enterprise/delete")
    JSONObject deleteEnterprise(@RequestParam(name = "id") Long id);

    @RequestMapping(method = { RequestMethod.GET }, value = "/enterprise/get")
    JSONObject findEnterpriseById(@RequestParam(name = "id") Long id);

    @RequestMapping(method = { RequestMethod.GET }, value = "/enterprise/getPageable")
    JSONObject getEnterprisePageable(@RequestParam(name = "pageSize") int pageSize,@RequestParam(name = "pageNumber") int pageNumber,
                                   @RequestParam(name = "enterpriseName", required = false) String enterpriseName);
}
