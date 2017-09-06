package com.dhxa.bizcloud.microservice.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.dhxa.bizcloud.microservice.entity.Personnel;
import com.dhxa.bizcloud.microservice.repository.IPersonnelRepository;

@Service("PersonnelService")
public class PersonnelService {
	@Autowired
	private IPersonnelRepository personnelRepository;
	
	public void save(Personnel entity) {
		personnelRepository.save(entity);
	}
	public void delete(Long id) {
		personnelRepository.delete(id);
	}
	public Personnel findOne(long id) {
		
		return personnelRepository.findOne(id);
	}
	public Page<Personnel> findPageable(int pageSize, int pageNumber, String personnelname){
		PageRequest pageRequest = new PageRequest(pageNumber,pageSize);
		
		return personnelRepository.findAll((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.isNotBlank(personnelname)) {
                predicates.add(criteriaBuilder.like(root.get("personnelname"), "%" + personnelname + "%"));
            }
            return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
        }, pageRequest);	
	}
}
