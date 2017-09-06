package com.dhxa.bizcloud.microservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="T_DEPARTMENT")
public class Department implements java.io.Serializable {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "departementId",insertable = true, updatable = true, nullable = false)
	private Long departementId;
	@Column(name = "deparmentName")
	private String departmentName;
	@Column(name="sectorNumber")
	private int sectorNumber;
	
	public Department() {}
	public Department(Long departementId) {
		this.departementId=departementId;
	}
	public Department(Long departementId, String departmentName, int sectorNumber) {
		super();
		this.departementId = departementId;
		this.departmentName = departmentName;
		this.sectorNumber = sectorNumber;
	}	
	public Long getDepartementId() {
		return departementId;
	}
	public void setDepartementId(Long departementId) {
		this.departementId = departementId;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public int getSectorNumber() {
		return sectorNumber;
	}
	public void setSectorNumber(int sectorNumber) {
		this.sectorNumber = sectorNumber;
	}
	
}