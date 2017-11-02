package com.dhxa.bizcloud.appservice.entity;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class Attachment {
	public Attachment() {}
	public Attachment(String fileName,String filePath) {
		this.fileName = fileName;
		this.filePath = filePath;
		Calendar c = Calendar.getInstance();
		this.upload_time = c.getTime();
	}
	private Long ID;
	
	private String fileName;
	
	private String filePath;
	
	private Date upload_time;

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Date getUpload_time() {
		return upload_time;
	}

	public void setUpload_time(Date upload_time) {
		this.upload_time = upload_time;
	}
	@Override
	public String toString() {
		return "Attachment [ID=" + ID + ", fileName=" + fileName + ", filePath=" + filePath + ", upload_time="
				+ upload_time + "]";
	}
	

}
