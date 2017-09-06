package com.dhxa.bizcloud.appservice.client.system;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.entity.system.Dept;
@FeignClient(name = "MICRO-SERVICE-RR")
public interface DeptClient {
    @RequestMapping(method = { RequestMethod.POST }, value = "/dept/add")
    JSONObject addDept(@RequestBody Dept dept);

    @RequestMapping(method = { RequestMethod.PUT }, value = "/dept/update")
    JSONObject updateDept(@RequestBody Dept dept);

    @RequestMapping(method = { RequestMethod.DELETE }, value = "/dept/delete")
    JSONObject deleteDept(@RequestParam(name = "id") Long id);

    @RequestMapping(method = { RequestMethod.GET }, value = "/dept/get")
    JSONObject findDeptById(@RequestParam(name = "id") Long id);

    @RequestMapping(method = { RequestMethod.GET }, value = "/dept/getPageable")
    JSONObject getDeptPageable(@RequestParam(name = "pageSize") int pageSize,@RequestParam(name = "pageNumber") int pageNumber,
                                   @RequestParam(name = "deptName", required = false) String deptName);
}
