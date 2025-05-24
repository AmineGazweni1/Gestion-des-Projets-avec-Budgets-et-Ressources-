package com.example.projectmanagement.service;

import com.example.projectmanagement.model.Projet;
import com.example.projectmanagement.repository.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProjetService {
    
    @Autowired
    private ProjetRepository projetRepository;
    
    public List<Projet> getAllProjets() {
        return projetRepository.findAll();
    }
    
    public Optional<Projet> getProjetById(Long id) {
        return projetRepository.findById(id);
    }
    
    public Projet saveProjet(Projet projet) {
        return projetRepository.save(projet);
    }
    
    public void deleteProjet(Long id) {
        projetRepository.deleteById(id);
    }
    
    public List<Projet> getProjetsByStatut(String statut) {
        return projetRepository.findByStatut(statut);
    }
}