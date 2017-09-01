package com.dhxa.bizcloud.appservice.entity;

public class Personnel implements java.io.Serializable{
	private Long personnelId;
	private String personnelName;
	private String personnelGender;
	private int personnelAge;
	
	public Personnel() {
		
	}
	public Personnel(Long personnelId) {
		this.personnelId=personnelId;
	}
	public Personnel(Long personnelId, String personnelName, String personnelGender, int personnelAge) {
		super();
		this.personnelId = personnelId;
		this.personnelName = personnelName;
		this.personnelGender = personnelGender;
		this.personnelAge = personnelAge;
	}
	public Long getPersonnelId() {
		return personnelId;
	}
	public void setPersonnelId(Long personnelId) {
		this.personnelId = personnelId;
	}
	public String getPersonnelName() {
		return personnelName;
	}
	public void setPersonnelName(String personnelName) {
		this.personnelName = personnelName;
	}
	public String getPersonnelGender() {
		return personnelGender;
	}
	public void setPersonnelGender(String personnelGender) {
		this.personnelGender = personnelGender;
	}
	public int getPersonnelAge() {
		return personnelAge;
	}
	public void setPersonnelAge(int personnelAge) {
		this.personnelAge = personnelAge;
	}
	@Override
	public String toString() {
		return "Personnel [personnelId=" + personnelId + ", personnelName=" + personnelName + ", personnelGender="
				+ personnelGender + ", personnelAge=" + personnelAge + "]";
	}
}
