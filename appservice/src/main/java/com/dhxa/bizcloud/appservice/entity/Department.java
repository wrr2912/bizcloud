package com.dhxa.bizcloud.appservice.entity;

public class Department implements java.io.Serializable{
	private Long departmentId;
	private String departmentName;
	private int sectorNumber;
	
	public Department() {
	}
	public Department(Long departmentId) {
		this.departmentId=departmentId;
	}
	public Department(Long departmentId, String departmentName, int sectorNumber) {
		super();
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.sectorNumber = sectorNumber;
	}
	public Long getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
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
