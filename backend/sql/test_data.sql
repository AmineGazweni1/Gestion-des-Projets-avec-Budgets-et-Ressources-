USE project_management;



-- Insérer des projets de test
INSERT INTO projet (nom, description, date_debut, date_fin, budget, statut) VALUES
('Site E-commerce', 'Développement d\'un site e-commerce pour vente de produits', '2023-01-15', '2023-06-30', 50000.00, 'EN_COURS'),
('Application Mobile', 'Application mobile pour la gestion des stocks', '2023-02-01', '2023-08-15', 35000.00, 'EN_COURS'),
('Refonte Intranet', 'Modernisation de l\'intranet de l\'entreprise', '2023-03-10', '2023-12-20', 25000.00, 'PLANIFIE'),
('Système CRM', 'Implémentation d\'un système CRM personnalisé', '2022-11-01', '2023-04-30', 45000.00, 'TERMINE'),
('Plateforme BI', 'Développement d\'une plateforme de Business Intelligence', '2023-05-01', '2024-01-31', 60000.00, 'EN_COURS');

-- Insérer des ressources de test
INSERT INTO ressource (nom, type, cout, disponibilite) VALUES
('Serveur AWS', 'MATERIEL', 1200.00, true),
('Licence Adobe', 'LOGICIEL', 800.00, true),
('Salle de réunion A', 'SALLE', 0.00, true),
('Imprimante 3D', 'MATERIEL', 2500.00, false),
('Licence Microsoft 365', 'LOGICIEL', 150.00, true);

-- Insérer des tâches de test
INSERT INTO tache (projet_id, responsable_id, description, etat, priorite, deadline) VALUES
(1, 1, 'Développer la page d\'accueil', 'EN_COURS', 'HAUTE', '2023-02-28'),
(1, 4, 'Intégrer le système de paiement', 'A_FAIRE', 'HAUTE', '2023-04-15'),
(2, 2, 'Concevoir les maquettes UI', 'TERMINE', 'MOYENNE', '2023-02-20'),
(3, 3, 'Analyser les besoins utilisateurs', 'EN_COURS', 'MOYENNE', '2023-04-10'),
(4, 5, 'Configurer l\'environnement de production', 'TERMINE', 'HAUTE', '2023-01-15'),
(5, 1, 'Développer les API de données', 'A_FAIRE', 'MOYENNE', '2023-06-30');

-- Associer des employés aux projets
INSERT INTO project_employes (project_id, employe_id) VALUES
(1, 1), (1, 2), (1, 4),
(2, 2), (2, 4), (2, 5),
(3, 1), (3, 3),
(4, 3), (4, 5),
(5, 1), (5, 5);

-- Associer des ressources aux tâches
INSERT INTO tache_ressource (tache_id, ressource_id) VALUES
(1, 1), (1, 2),
(2, 1),
(3, 2), (3, 3),
(4, 3),
(5, 1), (5, 5),
(6, 1), (6, 5);

-- Insérer un utilisateur de test (mot de passe: admin123)
INSERT INTO user (username, password, email, role) VALUES
('admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'admin@example.com', 'ROLE_ADMIN');