package com.dhxa.bizcloud.microservice.service;

import org.springframework.stereotype.Service;

import com.dhxa.bizcloud.microservice.entity.User;
import com.dhxa.bizcloud.microservice.repository.IUserRepository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service("UserService")
public class UserService {

	@Autowired
	private IUserRepository userRepository;

	public User findUserByUserName(String userName) {
		return this.userRepository.findUserByUserName(userName);
	}

	public User findUserById(Long id) {
		return this.userRepository.findOne(id);
	}

	public void save(User entity) {
		userRepository.save(entity);
	}

	public void delete(Long id) {
		userRepository.delete(id);
	}

	public User findOne(Long id) {
		return userRepository.findOne(id);
	}

	public Page<User> findPageable(int pageSize, int pageNumber, String username) {
		PageRequest pageRequest = new PageRequest(pageNumber, pageSize);
		return userRepository.findAll((root, criteriaQuery, criteriaBuilder) -> {
			List<Predicate> predicates = new ArrayList<>();
			if (StringUtils.isNotBlank(username)) {
				predicates.add(criteriaBuilder.like(root.get("username"), "%" + username + "%"));
			}
			return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
		}, pageRequest);
	}

}
