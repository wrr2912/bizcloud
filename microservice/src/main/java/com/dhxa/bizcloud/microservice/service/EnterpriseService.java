package com.dhxa.bizcloud.microservice.service;

import com.dhxa.bizcloud.microservice.entity.Enterprise;
import com.dhxa.bizcloud.microservice.repository.IEnterpriseRepository;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

@Service("EnterpriseService")
public class EnterpriseService {
    @Autowired
    private IEnterpriseRepository enterpriseRepository;
    private Logger logger = LoggerFactory.getLogger(EnterpriseService.class);
    public void save(Enterprise entity){
    	logger.info("entity----------------------------" + entity.toString());
        enterpriseRepository.save(entity);
    }

    public void delete(Long id)
    {
        enterpriseRepository.delete(id);
    }

    public Enterprise findOne(Long id)
    {
        return enterpriseRepository.findOne(id);
    }
    
    

    public Page<Enterprise> findPageable(int pageSize, int pageNumber, String enterprisename)
    {
        PageRequest pageRequest = new PageRequest(pageNumber,pageSize);
        return enterpriseRepository.findAll((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.isNotBlank(enterprisename)) {
                predicates.add(criteriaBuilder.like(root.get("enterpriseName"), enterprisename));
            }
            return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
        }, pageRequest);
    }

}
