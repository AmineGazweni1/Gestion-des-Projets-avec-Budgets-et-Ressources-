package com.example.projectmanagement.controller;

import com.example.projectmanagement.model.Projet;
import com.example.projectmanagement.service.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projets")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {
    
    @Autowired
    private ProjetService projetService;
    
    @GetMapping
    public List<Projet> getAllProjets() {
        return projetService.getAllProjets();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Projet> getProjetById(@PathVariable Long id) {
        return projetService.getProjetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Projet createProjet(@RequestBody Projet projet) {
        return projetService.saveProjet(projet);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Projet> updateProjet(@PathVariable Long id, @RequestBody Projet projet) {
        return projetService.getProjetById(id)
                .map(existingProjet -> {
                    projet.setId(id);
                    return ResponseEntity.ok(projetService.saveProjet(projet));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable Long id) {
        return projetService.getProjetById(id)
                .map(projet -> {
                    projetService.deleteProjet(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/statut/{statut}")
    public List<Projet> getProjetsByStatut(@PathVariable String statut) {
        return projetService.getProjetsByStatut(statut);
    }
}