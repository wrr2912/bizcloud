package com.dhxa.bizcloud.microservice.entity;

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

@Table(name = "AJ_DV_ATTASHMENT")
@Entity
public class Attachment {
	public Attachment() {}
	public Attachment(String fileName,String filePath) {
		this.fileName = fileName;
		this.filePath = filePath;
		Calendar c = Calendar.getInstance();
		this.upload_time = c.getTime();
	}
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ID",insertable = true, updatable = true, nullable = false)
	private Long ID;
	
	@Column(name = "FILENAME", nullable = false)
	private String fileName;
	
	@Column(name = "FILEPATH", nullable = false)
	private String filePath;
	
	@Column(name = "UPLOADTIME",columnDefinition="TIMESTAMP",nullable = false )
    @Temporal(TemporalType.TIMESTAMP) 
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
	

}
