package com.example.projectmanagement.repository;

import com.example.projectmanagement.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByType(String type);
    List<Resource> findByAvailable(Boolean available);
    List<Resource> findByTasksId(Long taskId);
} 