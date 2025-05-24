package com.example.projectmanagement.service;

import com.example.projectmanagement.model.Tache;
import com.example.projectmanagement.repository.TacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TacheService {
    
    @Autowired
    private TacheRepository tacheRepository;
    
    public List<Tache> getAllTaches() {
        return tacheRepository.findAll();
    }
    
    public Optional<Tache> getTacheById(Long id) {
        return tacheRepository.findById(id);
    }
    
    public Tache saveTache(Tache tache) {
        return tacheRepository.save(tache);
    }
    
    public void deleteTache(Long id) {
        tacheRepository.deleteById(id);
    }
    
    public List<Tache> getTachesByProjet(Long projetId) {
        return tacheRepository.findByProjetId(projetId);
    }
    
    public List<Tache> getTachesByResponsable(Long responsableId) {
        return tacheRepository.findByResponsableId(responsableId);
    }
}