
-- Schema for Project Management Application

CREATE DATABASE IF NOT EXISTS project_management;
USE project_management;

-- Table for employees
CREATE TABLE employe (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    poste VARCHAR(50),
    equipe VARCHAR(100)
);

-- Table for projects
CREATE TABLE projet (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    date_debut DATE,
    date_fin DATE,
    budget DECIMAL(12,2),
    statut VARCHAR(50) DEFAULT 'EN_COURS'
);

-- Table for resources
CREATE TABLE resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

-- Table for tasks
CREATE TABLE tache (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    projet_id BIGINT,
    responsable_id BIGINT,
    description TEXT,
    etat VARCHAR(50) DEFAULT 'A_FAIRE',
    priorite VARCHAR(20) DEFAULT 'MOYENNE',
    deadline DATE,
    FOREIGN KEY (projet_id) REFERENCES projet(id) ON DELETE CASCADE,
    FOREIGN KEY (responsable_id) REFERENCES employe(id) ON DELETE SET NULL
);

-- Junction table for many-to-many relationship between projects and employees
CREATE TABLE project_employes (
    project_id BIGINT,
    employe_id BIGINT,
    PRIMARY KEY (project_id, employe_id),
    FOREIGN KEY (project_id) REFERENCES projet(id) ON DELETE CASCADE,
    FOREIGN KEY (employe_id) REFERENCES employe(id) ON DELETE CASCADE
);

-- Junction table for many-to-many relationship between tasks and resources
CREATE TABLE tache_ressource (
    tache_id BIGINT,
    ressource_id BIGINT,
    PRIMARY KEY (tache_id, ressource_id),
    FOREIGN KEY (tache_id) REFERENCES tache(id) ON DELETE CASCADE,
    FOREIGN KEY (ressource_id) REFERENCES ressource(id) ON DELETE CASCADE
);

-- Table for users (authentication)
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'ROLE_USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


