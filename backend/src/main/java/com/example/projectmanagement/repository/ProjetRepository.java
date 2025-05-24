package com.example.projectmanagement.repository;

import com.example.projectmanagement.model.Projet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjetRepository extends JpaRepository<Projet, Long> {
    List<Projet> findByStatut(String statut);
}