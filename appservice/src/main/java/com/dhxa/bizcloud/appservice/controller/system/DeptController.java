package com.dhxa.bizcloud.appservice.controller.system;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.dhxa.bizcloud.appservice.client.system.DeptClient;
import com.dhxa.bizcloud.appservice.entity.system.Dept;

@RestController
@RequestMapping(value = "/dept")
public class DeptController {
    private Logger logger = LoggerFactory.getLogger(DeptController.class);

    DeptClient deptClient;

    @Autowired
    public DeptController(DeptClient deptClient){
        this.deptClient = deptClient;
    }

    @RequestMapping(value = "getPageable", method = RequestMethod.GET)
    @CrossOrigin
    public Object getDeptsPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                       @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
                                       @RequestParam(name = "name", required = false) String name) {
        logger.info("parameters:pageSize={},pageNumber={},name={}",pageSize,pageNumber,name);
        return deptClient.getDeptPageable(pageSize, pageNumber, name);

    }
    
    @RequestMapping(value = "get" , method = RequestMethod.GET)
    @CrossOrigin
    public Object getDeptInfo(@RequestParam Long id){
        logger.info("paras:id = {}", id);
        return deptClient.findDeptById(id);
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    @Transactional
    @CrossOrigin
    public Object addDept(@RequestBody Dept data) {
        return deptClient.addDept(data);
    }
    @RequestMapping(value = "update", method = RequestMethod.PUT)
    @CrossOrigin
    public Object updateDept(@RequestBody Dept data) {
        return deptClient.updateDept(data);
    }

    @RequestMapping(value = "delete", method = RequestMethod.DELETE)
    @CrossOrigin
    public Object delDept(@RequestParam Long id) {
    	return  deptClient.deleteDept(id);
    }

}
