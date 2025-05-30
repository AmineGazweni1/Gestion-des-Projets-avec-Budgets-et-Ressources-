package com.example.projectmanagement.repository;

import com.example.projectmanagement.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatus(String status);
    List<Project> findByEmployesId(Long employeId);
} 