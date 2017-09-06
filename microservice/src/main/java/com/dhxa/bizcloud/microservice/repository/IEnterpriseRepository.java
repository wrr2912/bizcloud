package com.dhxa.bizcloud.microservice.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import com.dhxa.bizcloud.microservice.entity.Enterprise;

public interface IEnterpriseRepository  extends CrudRepository<Enterprise, Long>, JpaSpecificationExecutor<Enterprise>{
}
