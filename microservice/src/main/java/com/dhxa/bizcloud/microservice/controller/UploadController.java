package com.dhxa.bizcloud.microservice.controller;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.dhxa.bizcloud.microservice.entity.Attachment;
import com.dhxa.bizcloud.microservice.message.SystemErrorCodeType;
import com.dhxa.bizcloud.microservice.service.AttachmentService;
import com.dhxa.bizcloud.microservice.utils.ResponseUtil;
import com.rayfay.bizcloud.core.commons.exception.NRAPException;

@RestController
@RequestMapping(value = "/file")
public class UploadController {
	private Logger logger = LoggerFactory.getLogger(UploadController.class);
	
	@Autowired
	private AttachmentService attachService;
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
    @CrossOrigin
    public Object  uploadFiles(@RequestParam String fileName, @RequestParam String filePath)  
    {
		try {
			Attachment attach = new Attachment(fileName, filePath);
			Long id = attachService.save(attach);
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("success", true);
			resultMap.put("id", id);
	        return resultMap;
		}catch(Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_ACTION_FALED,e.getMessage()+"增加");
		}
		
    }
	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
    @CrossOrigin
    public Object  getFile(@RequestParam Long id)
    {
		try {
			Attachment attach = attachService.findOne(id);			
			return ResponseUtil.makeSuccessResponse(attach);
		} catch(Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED, e.getMessage() + "读取数据");
		}
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	@CrossOrigin
	public Object deleteFile(@RequestParam Long id) {
		try {
			attachService.delete(id);
			return ResponseUtil.makeSuccessResponse();
		}catch(Exception e) {
			throw new NRAPException(SystemErrorCodeType.E_GET_DATA_FALED, e.getMessage() + "删除");
		}
	}
}
