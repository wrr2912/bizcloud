package com.dhxa.bizcloud.microservice.repository;

import com.dhxa.bizcloud.microservice.entity.Dept;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface IDeptRepository  extends CrudRepository<Dept, Long>, JpaSpecificationExecutor<Dept>{
}
