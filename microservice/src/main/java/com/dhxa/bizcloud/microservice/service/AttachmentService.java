package com.dhxa.bizcloud.microservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhxa.bizcloud.microservice.entity.Attachment;
import com.dhxa.bizcloud.microservice.repository.IAttachmentRepository;

@Service("AttachmentService")
public class AttachmentService {
	 @Autowired
	 private IAttachmentRepository attachmentRepository;

    public Long save(Attachment entity){
    	Attachment savedEntity = attachmentRepository.save(entity);
    	if(savedEntity != null) {
    		return savedEntity.getID();
    	}
    	else {
    		return -1L;
    	}
    }

    public void delete(Long id)
    {
    	attachmentRepository.delete(id);
    }

    public Attachment findOne(Long id)
    {
        return attachmentRepository.findOne(id);
    }
}
