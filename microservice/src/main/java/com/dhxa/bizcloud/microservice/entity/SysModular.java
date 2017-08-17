package com.dhxa.bizcloud.microservice.entity;

// Generated 2017-8-16 14:10:10 by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;

/**
 * TaSysModular generated by hbm2java
 */
public class SysModular implements java.io.Serializable {

	private BigDecimal id;
	private String briefName;
	private String modularName;
	private Boolean isdelete;
	private String modularLevel;
	private BigDecimal parId;

	public SysModular() {
	}

	public SysModular(BigDecimal id) {
		this.id = id;
	}

	public SysModular(BigDecimal id, String briefName, String modularName,
			Boolean isdelete, String modularLevel, BigDecimal parId) {
		this.id = id;
		this.briefName = briefName;
		this.modularName = modularName;
		this.isdelete = isdelete;
		this.modularLevel = modularLevel;
		this.parId = parId;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getBriefName() {
		return this.briefName;
	}

	public void setBriefName(String briefName) {
		this.briefName = briefName;
	}

	public String getModularName() {
		return this.modularName;
	}

	public void setModularName(String modularName) {
		this.modularName = modularName;
	}

	public Boolean getIsdelete() {
		return this.isdelete;
	}

	public void setIsdelete(Boolean isdelete) {
		this.isdelete = isdelete;
	}

	public String getModularLevel() {
		return this.modularLevel;
	}

	public void setModularLevel(String modularLevel) {
		this.modularLevel = modularLevel;
	}

	public BigDecimal getParId() {
		return this.parId;
	}

	public void setParId(BigDecimal parId) {
		this.parId = parId;
	}

}