package com.dhxa.bizcloud.microservice.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.apache.commons.lang3.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
	public void delete(Long id) {
		supervisionInstitutionRepository.delete(id);
	}
	public SupervisionInstitution findOne(Long id) {
		return supervisionInstitutionRepository.findOne(id);
	}
	
	public Page<SupervisionInstitution> findPageable(int pageSize, int pageNumber, String unitName,String supervision,String prefectureSupervision,String qualitySupervision,String qualitySupervisionArea)

    /*supervision: null, //铁路总公司监督机构、
    prefectureSupervision: null,  //地区政府监管部门
    perfetureSupervision
    qualitySupervision: null,  //质量监督机构
    qualitySupervisionArea: null,  //监督机构所属地域*/
    {
        PageRequest pageRequest = new PageRequest(pageNumber,pageSize);
        return supervisionInstitutionRepository.findAll((root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (StringUtils.isNotBlank(unitName)) {
                predicates.add(criteriaBuilder.like(root.get("unitName"), "%"+unitName+"%"));
            }
            if (StringUtils.isNotBlank(supervision)) {
                predicates.add(criteriaBuilder.like(root.get("supervision"), "%"+supervision+"%"));
            }
            if (StringUtils.isNotBlank(prefectureSupervision)) {
                predicates.add(criteriaBuilder.like(root.get("prefectureSupervision"), "%"+prefectureSupervision+"%"));
            }
            if (StringUtils.isNotBlank(qualitySupervision)) {
                predicates.add(criteriaBuilder.like(root.get("qualitySupervision"), "%"+qualitySupervision+"%"));
            }
            if (StringUtils.isNotBlank(qualitySupervisionArea)) {
                predicates.add(criteriaBuilder.like(root.get("qualitySupervisionArea"), "%"+qualitySupervisionArea+"%"));
            }
            return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
        }, pageRequest);
    }
}
