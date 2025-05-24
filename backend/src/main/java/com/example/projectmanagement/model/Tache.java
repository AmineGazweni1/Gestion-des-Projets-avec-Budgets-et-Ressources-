package com.example.projectmanagement.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.Set;

@Data
@Entity
public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;
    
    @ManyToOne
    @JoinColumn(name = "responsable_id")
    private Employe responsable;
    
    private String description;
    private String etat;
    private String priorite;
    private LocalDate deadline;
    
    @ManyToMany
    @JoinTable(
        name = "tache_ressource",
        joinColumns = @JoinColumn(name = "tache_id"),
        inverseJoinColumns = @JoinColumn(name = "ressource_id")
    )
    private Set<Ressource> ressources;
}