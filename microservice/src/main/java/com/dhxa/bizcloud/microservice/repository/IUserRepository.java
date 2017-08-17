package com.dhxa.bizcloud.microservice.repository;

import org.springframework.data.repository.CrudRepository;
import com.dhxa.bizcloud.microservice.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IUserRepository extends CrudRepository<User, Long>{
	
	@Query("from User u where u.username=:userName")
    User findUserByUserName(@Param("userName") String userName);

}
