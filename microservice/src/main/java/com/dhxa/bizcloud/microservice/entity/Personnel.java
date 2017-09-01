package com.dhxa.bizcloud.microservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="T_PERSONNEL")
public class Personnel implements java.io.Serializable{
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "PERSONNELID",insertable = true, updatable = true, nullable = false)
	private long personnelId;
	
	@Column(name = "PERSONNELNAME")
	private String personnelName;
	
	@Column(name = "PERSONNELGENDER")
	private String personnelGender;
	
	@Column(name = "PERSONNELAGE")
	private int personnelAge;
	public Personnel() {}
	public Personnel(Long personnelId) {
		this.personnelId=personnelId;
	}
	
	public Personnel(long personnelId, String personnelName, String personnelGender, int personnelAge) {
		super();
		this.personnelId = personnelId;
		this.personnelName = personnelName;
		this.personnelGender = personnelGender;
		this.personnelAge = personnelAge;
	}

	public long getpersonnelId() {
		return personnelId;
	}
	public void setpersonnelId(long personnelId) {
		this.personnelId = personnelId;
	}
	public String getpersonnelName() {
		return personnelName;
	}
	public void setpersonnelName(String personnelName) {
		this.personnelName = personnelName;
	}
	public String getpersonnelGender() {
		return personnelGender;
	}
	public void setpersonnelGender(String personnelGender) {
		this.personnelGender = personnelGender;
	}
	public int getpersonnelAge() {
		return personnelAge;
	}
	public void setpersonnelAge(int personnelAge) {
		this.personnelAge = personnelAge;
	}

//	@Override
//	public String toString() {
//		return "Personnel [personnelId=" + personnelId + ", personnelName=" + personnelName + ", personnelGender="
//				+ personnelGender + ", personnelAge=" + personnelAge + "]";
//	};
}
