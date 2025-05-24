package com.example.projectmanagement.repository;

import com.example.projectmanagement.model.Employe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeRepository extends JpaRepository<Employe, Long> {
    Employe findByEmail(String email);
}