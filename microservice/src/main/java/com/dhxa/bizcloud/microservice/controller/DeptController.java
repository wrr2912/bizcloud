package com.dhxa.bizcloud.microservice.controller;

import com.dhxa.bizcloud.microservice.entity.Dept;
import com.dhxa.bizcloud.microservice.message.SystemMessage;
import com.dhxa.bizcloud.microservice.message.SystemErrorCodeType;
import com.dhxa.bizcloud.microservice.service.DeptService;
import com.dhxa.bizcloud.microservice.utils.ResponseUtil;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/dept")
public class DeptController {
    private Logger logger = LoggerFactory.getLogger(DeptController.class);

    @ApiOperation(value=SystemMessage.M_DEPT_FIND_PAGE_BY_QUERY, notes=SystemMessage.M_DEPT_FIND_PAGE_BY_QUERY)
    @ApiImplicitParams(value = {
    		@ApiImplicitParam(name = SystemMessage.E_PAGE_SIZE, value = SystemMessage.C_PAGE_SIZE, required = true, paramType = "query", dataType = "int"),
    		@ApiImplicitParam(name = SystemMessage.E_PAGE_NUM, value = SystemMessage.C_PAGE_NUM, required = true, paramType = "query", dataType = "int"),
	        @ApiImplicitParam(name = SystemMessage.E_DEPT_NAME, value = SystemMessage.C_DEPT_NAME, required = false, paramType = "query", dataType = "String")
	})
    @RequestMapping(value = "getPageable", method = RequestMethod.GET)
    @CrossOrigin
    public Object getDeptsPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                       @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
                                       @RequestParam(name = "deptName", required = false) String deptName) {
        logger.info("parameters:pageSize={},pageNumber={},deptName={}",pageSize,pageNumber,deptName);
        try {
            Page<Dept> result = deptService.findPageable(pageSize,pageNumber-1,deptName);
            return ResponseUtil.makeSuccessResponse(result.getTotalElements(), result.getContent());
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
        }
    }

    @Autowired
    private DeptService deptService;

    @ApiOperation(value=SystemMessage.M_DEPT_FIND_BY_ID, notes=SystemMessage.M_DEPT_FIND_BY_ID)
    @ApiImplicitParams(value= {
    		@ApiImplicitParam(name = SystemMessage.E_DEPT_ID, value=SystemMessage.C_DEPT_ID, required = true, paramType="query", dataType="Long")
    })
    @RequestMapping(value = "get" , method = RequestMethod.GET)
    @CrossOrigin
    public Object getDept(@RequestParam Long id){
        logger.info("paras:id = {}", id);
        try{
            List<Dept> result = new ArrayList<>();
            Dept info = deptService.findOne(id);
            if(null != result){
                result.add(info);
            }
            logger.info("dept-get result: = [{}],{}",id,(info != null) ? info.toString(): "");
            return ResponseUtil.makeSuccessResponse(result.size(), result);
        }catch(Exception e){
        	System.out.println(e.toString());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
        }
    }

    @ApiOperation(value = SystemMessage.M_DEPT_CREATE, notes = SystemMessage.M_DEPT_CREATE)
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @Transactional
    @CrossOrigin
    public Object addDept(@RequestBody Dept data) {
        try {
            deptService.save(data);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
        }
    }
    
    @ApiOperation(value = SystemMessage.M_DEPT_UPDATE, notes = SystemMessage.M_DEPT_UPDATE)
    @RequestMapping(value = "update", method = RequestMethod.PUT)
    @CrossOrigin
    public Object updateDept(@RequestBody Dept data) {
        try {
            Dept dbData = deptService.findOne(data.getId());
            dbData.setDeptName(data.getDeptName());
            dbData.setProvince(data.getProvince());
            dbData.setCity(data.getCity());
            dbData.setCountry(data.getCountry());
            dbData.setCreateTime(data.getCreateTime());
            dbData.setCreator(data.getCreator());
            dbData.setIsdelete(data.getIsdelete());
            dbData.setHigherDeptId(data.getHigherDeptId());
            dbData.setEmail(data.getEmail());
            
            deptService.save(dbData);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"更新");
        }
    }

    @ApiOperation(value=SystemMessage.M_DEPT_DELETE, notes=SystemMessage.M_DEPT_DELETE)
    @ApiImplicitParams(value= {
    		@ApiImplicitParam(name = SystemMessage.E_DEPT_ID, value=SystemMessage.C_DEPT_ID, required = true, paramType="query", dataType="Long")
    })
    @RequestMapping(value = "delete", method = RequestMethod.DELETE)
    @CrossOrigin
    public Object delDept(@RequestParam Long id) {
        try {
            deptService.delete(id);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"删除");
        }
    }

}
