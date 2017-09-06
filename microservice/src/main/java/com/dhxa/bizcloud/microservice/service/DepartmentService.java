package com.dhxa.bizcloud.microservice.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.dhxa.bizcloud.microservice.entity.Department;
import com.dhxa.bizcloud.microservice.repository.IDepartmentRepository;

@Service("DepartmentService")
public class DepartmentService {
	
	@Autowired
	private IDepartmentRepository departmentRepository;
	
	public void save(Department entity) {
		departmentRepository.save(entity);
	}
	public void delete(Long departmentId) {
		departmentRepository.delete(departmentId);
	}
	public Department findOne(Long departmentId) {
		return departmentRepository.findOne(departmentId);
	}
	public Page<Department> findPageable(int pageSize, int pageNumber, String departmentName){
		PageRequest pageRequest = new PageRequest(pageNumber,pageSize);
		
		return departmentRepository.findAll((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.isNotBlank(departmentName)) {
                predicates.add(criteriaBuilder.like(root.get("departmentName"), "%" + departmentName + "%"));
            }
            return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
        }, pageRequest);	
	}
}
