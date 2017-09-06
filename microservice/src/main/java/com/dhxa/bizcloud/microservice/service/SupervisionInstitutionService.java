package com.dhxa.bizcloud.microservice.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.dhxa.bizcloud.microservice.entity.SupervisionInstitution;
import com.dhxa.bizcloud.microservice.repository.ISupervisionInstitutionRepository;

@Service("SupervisionInstitutionService")
public class SupervisionInstitutionService {
	@Autowired
	private ISupervisionInstitutionRepository supervisionInstitutionRepository;
	
	public void save(SupervisionInstitution entity) {
		supervisionInstitutionRepository.save(entity);
	}
	public void delete(Long SIId) {
		supervisionInstitutionRepository.delete(SIId);
	}
	public SupervisionInstitution findOne(Long SIId) {
		return supervisionInstitutionRepository.findOne(SIId);
	}
	
	public Page<SupervisionInstitution> findPageable(int pageSize, int pageNumber, String unitName)
    {
        PageRequest pageRequest = new PageRequest(pageNumber,pageSize);
        return supervisionInstitutionRepository.findAll((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.isNotBlank(unitName)) {
                predicates.add(criteriaBuilder.like(root.get("unitName"), unitName));
            }
            return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
        }, pageRequest);
    }
}
