package com.example.projectmanagement.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Employe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String poste;
    private String equipe;
}