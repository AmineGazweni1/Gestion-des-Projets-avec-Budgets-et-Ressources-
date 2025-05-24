package com.example.projectmanagement.repository;

import com.example.projectmanagement.model.Ressource;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RessourceRepository extends JpaRepository<Ressource, Long> {
    List<Ressource> findByDisponibilite(Boolean disponibilite);
}