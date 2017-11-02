package com.dhxa.bizcloud.microservice.controller;

import com.dhxa.bizcloud.microservice.entity.Enterprise;
import com.dhxa.bizcloud.microservice.message.SystemMessage;
import com.dhxa.bizcloud.microservice.message.SystemErrorCodeType;
import com.dhxa.bizcloud.microservice.service.EnterpriseService;
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
@RequestMapping(value = "/enterprise")
public class EnterpriseController {
    private Logger logger = LoggerFactory.getLogger(EnterpriseController.class);

    @ApiOperation(value=SystemMessage.M_ENTERPRISE_FIND_PAGE_BY_QUERY, notes=SystemMessage.M_ENTERPRISE_FIND_PAGE_BY_QUERY)
    @ApiImplicitParams(value = {
    		@ApiImplicitParam(name = SystemMessage.E_PAGE_SIZE, value = SystemMessage.C_PAGE_SIZE, required = true, paramType = "query", dataType = "int"),
    		@ApiImplicitParam(name = SystemMessage.E_PAGE_NUM, value = SystemMessage.C_PAGE_NUM, required = true, paramType = "query", dataType = "int"),
	        @ApiImplicitParam(name = SystemMessage.E_ENTERPRISE_NAME, value = SystemMessage.C_ENTERPRISE_NAME, required = false, paramType = "query", dataType = "String")
	})
    @RequestMapping(value = "getPageable", method = RequestMethod.GET)
    @CrossOrigin
    public Object getEnterprisesPageable(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                       @RequestParam(name = "pageNumber", defaultValue = "1") int pageNumber,
                                       @RequestParam(name = "enterpriseName", required = false) String enterpriseName) {
        logger.info("parameters:pageSize={},pageNumber={},enterpriseName={}",pageSize,pageNumber,enterpriseName);
        try {
            Page<Enterprise> result = enterpriseService.findPageable(pageSize,pageNumber-1,enterpriseName);
            return ResponseUtil.makeSuccessResponse(result.getTotalElements(), result.getContent());
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
        }
    }

    @Autowired
    private EnterpriseService enterpriseService;

    @ApiOperation(value=SystemMessage.M_ENTERPRISE_FIND_BY_ID, notes=SystemMessage.M_ENTERPRISE_FIND_BY_ID)
    @ApiImplicitParams(value= {
    		@ApiImplicitParam(name = SystemMessage.E_ENTERPRISE_ID, value=SystemMessage.C_ENTERPRISE_ID, required = true, paramType="query", dataType="Long")
    })
    @RequestMapping(value = "get" , method = RequestMethod.GET)
    @CrossOrigin
    public Object getEnterprise(@RequestParam Long id){
        logger.info("paras:id = {}", id);
        try{
            List<Enterprise> result = new ArrayList<>();
            Enterprise info = enterpriseService.findOne(id);
            if(null != result){
                result.add(info);
            }
            logger.info("enterprise-get result: = [{}],{}",id,(info != null) ? info.toString(): "");
            return ResponseUtil.makeSuccessResponse(result.size(), result);
        }catch(Exception e){
        	System.out.println(e.toString());
            throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED);
        }
    }

    @ApiOperation(value = SystemMessage.M_ENTERPRISE_CREATE, notes = SystemMessage.M_ENTERPRISE_CREATE)
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @Transactional
    @CrossOrigin
    public Object addEnterprise(@RequestBody Enterprise data) {
        try {
            enterpriseService.save(data);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
        }
    }
    
    @ApiOperation(value = SystemMessage.M_ENTERPRISE_UPDATE, notes = SystemMessage.M_ENTERPRISE_UPDATE)
    @RequestMapping(value = "update", method = RequestMethod.PUT)
    @CrossOrigin
    public Object updateEnterprise(@RequestBody Enterprise data) {
        try {
            Enterprise dbData = enterpriseService.findOne(data.getId());
            if(data.getEnterprise_name() != null) {
                dbData.setEnterprise_name(data.getEnterprise_name());
            }
            if(data.getAdministrative_licensing_statistics() != null) {
            	dbData.setAdministrative_licensing_statistics(data.getAdministrative_licensing_statistics());
            }
            if(data.getContact_number() != null) {
            	dbData.setContact_number(data.getContact_number());
            }
            if(data.getContacts() != null) {
            	dbData.setContacts(data.getContacts());
            }
            if(data.getEnterprise_nature() != null) {
            	dbData.setEnterprise_nature(data.getEnterprise_nature());
            }
            if(data.getEnterprise_type() != null) {
            	dbData.setEnterprise_type(data.getEnterprise_type());
            }
            if(data.getFax() != null) {
            	dbData.setFax(data.getFax());
            }
            if(data.getFounding_time() != null) {
            	dbData.setFounding_time(data.getFounding_time());
            }
        	if(data.getLegal_representative() != null) {
        		dbData.setLegal_representative(data.getLegal_representative());
        	}
        	if(data.getLocal_bureau() != null) {
        		dbData.setLocal_bureau(data.getLocal_bureau());
        	}
        	if(data.getManufacturer_address() != null) {
        		dbData.setManufacturer_address(data.getManufacturer_address());
        	}
        	if(data.getPostal_code() != null) {
        		dbData.setPostal_code(data.getPostal_code());
        	}
        	if(data.getProduct_category() != null) {
        		dbData.setProduct_category(data.getProduct_category());
        	}
        	if(data.getRegister_address() != null) {
        		dbData.setRegister_address(data.getRegister_address());
        	}
        	if(data.getRegisterd_capital() != null) {
        		dbData.setRegisterd_capital(data.getRegisterd_capital());
        	}
        	if(data.getRemark() != null) {
        		dbData.setRemark(data.getRemark());
        	}
        	if(data.getStaff_number() != null) {
        		dbData.setStaff_number(data.getStaff_number());
        	}

        	if(data.getManufacturer_administrative() != null) {

            	dbData.setManufacturer_administrative(data.getManufacturer_administrative());
        	}

	    	if(data.getArea() != null) {
	    		dbData.setArea(data.getArea());
	    	}
	
	    	if(data.getAssets() != null) {
	    		dbData.setAssets(data.getAssets());
	    	}
	
	    	if(data.getBusiness_status() != null) {
	    		dbData.setBusiness_status(data.getBusiness_status());
	    	}
	
	    	if(data.getCompany_identification() != null) {
	    		dbData.setCompany_identification(data.getCompany_identification());
	    	}
	
	    	if(data.getCompany_name() != null) {
	    		dbData.setCompany_name(data.getCompany_name());
	    	}
	
	    	if(data.getEconomic_coding() != null) {
	    		dbData.setEconomic_coding(data.getEconomic_coding());
	    	}
	
	    	if(data.getEmail() != null) {
	    		dbData.setEmail(data.getEmail());
	    	}
	
	    	if(data.getEnterprise_identification() != null) {
	    		dbData.setEnterprise_identification(data.getEnterprise_identification());
	    	}
	
	    	if(data.getEnterprise_name() != null) {
	    		dbData.setEnterprise_name(data.getEnterprise_name());
	    	}
	
	    	if(data.getEnterprise_nature() != null) {
	    		dbData.setEnterprise_nature(data.getEnterprise_nature());
	    	}
	
	    	if(data.getEnterprise_type() != null) {
	    		dbData.setEnterprise_type(data.getEnterprise_type());
	    	}
	
	    	if(data.getGroup_flag() != null) {
	    		dbData.setGroup_flag(data.getGroup_flag());
	    	}
	
	    	if(data.getIndustry_affiliation() != null) {
	    		dbData.setIndustry_affiliation(data.getIndustry_affiliation());
	    	}
	
	    	if(data.getIndustry_code() != null) {
	    		dbData.setIndustry_code(data.getIndustry_code());
	    	}
	
	    	if(data.getLicense_type() != null) {
	    		dbData.setLicense_type(data.getLicense_type());
	    	}
	
	    	if(data.getLocal_regulators() != null) {
	    		dbData.setLocal_regulators(data.getLocal_regulators());
	    	}
	
	    	if(data.getN_ecnomic_code() != null) {
	    		dbData.setN_ecnomic_code(data.getN_ecnomic_code());
	    	}
	
	    	if(data.getOrgnization_code() != null) {
	    		dbData.setOrgnization_code(data.getOrgnization_code());
	    	}
	
	    	if(data.getP_enterprise_identification() != null) {
	    		dbData.setP_enterprise_identification(data.getP_enterprise_identification());
	    	}
	
	    	if(data.getEnterprise_name() != null) {
	    		dbData.setP_enterprise_name(data.getEnterprise_name());
	    	}
	
	    	if(data.getProfile() != null) {
	    		dbData.setProfile(data.getProfile());
	    	}
	
	    	if(data.getProfit() != null) {
	    		dbData.setProfit(data.getProfit());
	    	}
	
	    	if(data.getRegister_administrative() != null) {
	    		dbData.setRegister_administrative(data.getRegister_administrative());
	    	}
	
	    	if(data.getRegistration_number() != null) {
	    		dbData.setRegistration_number(data.getRegistration_number());
	    	}
	
	    	if(data.getResponsible_contacts() != null) {
	    		dbData.setResponsible_contacts(data.getResponsible_contacts());
	    	}
	
	    	if(data.getResponsible_email() != null) {
	    		dbData.setResponsible_email(data.getResponsible_email());
	    	}
	
	    	if(data.getResponsible_person() != null) {
	    		dbData.setResponsible_person(data.getResponsible_person());
	    	}
	
	    	if(data.getManufacturer_administrative() != null) {
	    		dbData.setScale(data.getScale());
	    	}
	
	    	if(data.getScope() != null) {
	    		dbData.setScope(data.getScope());
	    	}
    		 enterpriseService.save(dbData);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"更新");
        }
    }

    @ApiOperation(value=SystemMessage.M_ENTERPRISE_DELETE, notes=SystemMessage.M_ENTERPRISE_DELETE)
    @ApiImplicitParams(value= {
    		@ApiImplicitParam(name = SystemMessage.E_ENTERPRISE_ID, value=SystemMessage.C_ENTERPRISE_ID, required = true, paramType="query", dataType="Long")
    })
    @RequestMapping(value = "delete", method = RequestMethod.DELETE)
    @CrossOrigin
    public Object delEnterprise(@RequestParam Long id) {
        try {
            enterpriseService.delete(id);
            return  ResponseUtil.makeSuccessResponse();
        } catch (Exception e) {
            throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,"删除");
        }
    }

}
