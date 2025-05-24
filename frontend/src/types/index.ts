export interface Projet {
  id?: number;
  nom: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  budget: number;
}

export interface Tache {
  id?: number;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  priorite: string;
  projetId: number;
  responsableId?: number;
}

export interface Employe {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  poste: string;
  equipe: string;
}

export interface Ressource {
  id?: number;
  name?: string;
  description?: string;
  type: string;
  available: boolean;
  // Propriétés pour la compatibilité avec le backend
  nom?: string;
  cout?: number;
  disponibilite?: boolean;
}

export interface AuthResponse {
  token: string;
  type: string;
} 
