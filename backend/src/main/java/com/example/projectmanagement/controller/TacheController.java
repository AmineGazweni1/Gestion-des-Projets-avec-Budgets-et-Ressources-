package com.example.projectmanagement.controller;

import com.example.projectmanagement.model.Tache;
import com.example.projectmanagement.service.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/taches")
@CrossOrigin(origins = "http://localhost:4200")
public class TacheController {
    
    @Autowired
    private TacheService tacheService;
    
    @GetMapping
    public List<Tache> getAllTaches() {
        return tacheService.getAllTaches();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Tache> getTacheById(@PathVariable Long id) {
        return tacheService.getTacheById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Tache createTache(@RequestBody Tache tache) {
        return tacheService.saveTache(tache);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Tache> updateTache(@PathVariable Long id, @RequestBody Tache tache) {
        return tacheService.getTacheById(id)
                .map(existingTache -> {
                    tache.setId(id);
                    return ResponseEntity.ok(tacheService.saveTache(tache));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTache(@PathVariable Long id) {
        return tacheService.getTacheById(id)
                .map(tache -> {
                    tacheService.deleteTache(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/projet/{projetId}")
    public List<Tache> getTachesByProjet(@PathVariable Long projetId) {
        return tacheService.getTachesByProjet(projetId);
    }
}