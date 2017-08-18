package com.dhxa.bizcloud.microservice.service;

import com.dhxa.bizcloud.microservice.entity.Dept;
import com.dhxa.bizcloud.microservice.repository.IDeptRepository;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

@Service("DeptService")
public class DeptService {
    @Autowired
    private IDeptRepository deptRepository;

    public void save(Dept entity){
        deptRepository.save(entity);
    }

    public void delete(Long id)
    {
        deptRepository.delete(id);
    }

    public Dept findOne(Long id)
    {
        return deptRepository.findOne(id);
    }

    public Page<Dept> findPageable(int pageSize, int pageNumber, String deptname)
    {
        PageRequest pageRequest = new PageRequest(pageNumber,pageSize);
        return deptRepository.findAll((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.isNotBlank(deptname)) {
                predicates.add(criteriaBuilder.like(root.get("deptname"), "%" + deptname + "%"));
            }
            return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
        }, pageRequest);
    }

}
