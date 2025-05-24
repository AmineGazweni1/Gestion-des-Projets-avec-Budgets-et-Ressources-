package com.example.projectmanagement.repository;

import com.example.projectmanagement.model.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TacheRepository extends JpaRepository<Tache, Long> {
    List<Tache> findByProjetId(Long projetId);
    List<Tache> findByResponsableId(Long responsableId);
}