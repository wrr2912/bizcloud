package com.dhxa.bizcloud.appservice.controller.common;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

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

import com.alibaba.fastjson.JSONObject;
import com.dhxa.bizcloud.appservice.client.UploadClient;
import com.dhxa.bizcloud.appservice.common.utils.ResponseUtil;
import com.dhxa.bizcloud.appservice.entity.Attachment;
@RestController
@RequestMapping(value = "/file")
public class UploadController {
	private Logger logger = LoggerFactory.getLogger(UploadController.class);
	
	@Autowired
	private UploadClient uploadClient ;
	
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
    @CrossOrigin
    public Object  uploadFiles(@RequestBody MultipartFile file,HttpServletRequest request) throws IllegalStateException, IOException 
	{ 
		if(file!=null)
        {
			String filePath = request.getSession().getServletContext().getRealPath("uploads");
			
		    File fileTom = new File(filePath);
		    if(!fileTom.exists()) {
		 	   fileTom.mkdirs();
		    }else {
		 	   logger.info("文件上传目录"+filePath +"已存在");
		    }
            String path=filePath +"\\"+file.getOriginalFilename();
            //上传
            file.transferTo(new File(path));
            logger.info(path);
            JSONObject jsonObject = uploadClient.fileUpload(file.getOriginalFilename(), filePath);
            if(jsonObject != null && jsonObject.getBooleanValue("success") == true && jsonObject.getString("id") != null && !"".equals(jsonObject.getString("id"))) {
            	return jsonObject;
            }else {
            	return ResponseUtil.makeErrorResponse("文件上传失败", "文件上传失败");
            }
        }else {
        	return ResponseUtil.makeErrorResponse("文件上传失败", "文件上传失败");
        }
    }
	@RequestMapping(value = "/get", method = RequestMethod.GET)
    @CrossOrigin
	public void getFile(@RequestParam Long id,HttpServletResponse response)
	{
		OutputStream os = null;
		try {
			JSONObject jsonObject = uploadClient.getFile(id);
			if(jsonObject != null && jsonObject.getBooleanValue("success") == true) {
				Attachment attach = jsonObject.getObject("result", Attachment.class);
				logger.info(attach.toString());
				os = response.getOutputStream();
				response.reset();			
				response.setHeader("Content-Type", "application/force-download");
				response.setHeader("Content-Disposition", "filename=" + new String(attach.getFileName().getBytes(),"iso-8859-1"));
				response.setContentType("application/octet-stream; charset=utf-8");
				response.setContentType("multipart/form-data"); 
				File file = new File(attach.getFilePath() +"\\" + attach.getFileName());
				byte[] fileBytes = FileUtils.readFileToByteArray(file);
				response.setContentLength(fileBytes.length);
				os.write(fileBytes);
				os.flush();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			if(os != null) {
				try {
					os.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}		
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	@CrossOrigin
	public Object deleteFile(@RequestParam Long id) {
		try {

			uploadClient.deleteFile(id);
			JSONObject jsonObject = uploadClient.getFile(id);
			if(jsonObject != null && jsonObject.getBooleanValue("success") == true) {
				Attachment attach = jsonObject.getObject("result", Attachment.class);
				logger.info(attach.toString());
				File file = new File(attach.getFilePath() + "\\" + attach.getFilePath());
				if(file.exists() && file.isFile()) {
					if(!file.delete()) {
						return ResponseUtil.makeErrorResponse("文件删除失败","文件删除失败");
					}
				}else {
					logger.info("文件"+ attach.getFilePath() + "\\" + attach.getFilePath() +"不存在");
					
				}
			}
			
			return ResponseUtil.makeSuccessResponse();
		}catch(Exception e) {
			return ResponseUtil.makeErrorResponse(e.getLocalizedMessage(), e.getMessage());
		}
	}
	
}
