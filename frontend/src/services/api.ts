import axios from 'axios';
import type { Projet, Tache, Employe, Ressource, AuthResponse } from '../types';

const API_URL = 'http://localhost:8081/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Project API calls
export const projetApi = {
  getAll: () => api.get<Projet[]>('/projets'),
  getById: (id: number) => api.get<Projet>(`/projets/${id}`),
  create: (projet: Projet) => api.post<Projet>('/projets', projet),
  update: (id: number, projet: Projet) => api.put<Projet>(`/projets/${id}`, projet),
  delete: (id: number) => api.delete(`/projets/${id}`),
  getByStatut: (statut: string) => api.get<Projet[]>(`/projets/statut/${statut}`),
};

// Task API calls
export const tacheApi = {
  getAll: () => api.get<Tache[]>('/taches'),
  getById: (id: number) => api.get<Tache>(`/taches/${id}`),
  create: (tache: Tache) => api.post<Tache>('/taches', tache),
  update: (id: number, tache: Tache) => api.put<Tache>(`/taches/${id}`, tache),
  delete: (id: number) => api.delete(`/taches/${id}`),
  getByProjet: (projetId: number) => api.get<Tache[]>(`/taches/projet/${projetId}`),
};

// Employee API calls
export const employeApi = {
  getAll: () => api.get<Employe[]>('/employes'),
  getById: (id: number) => api.get<Employe>(`/employes/${id}`),
  create: (employe: Employe) => api.post<Employe>('/employes', employe),
  update: (id: number, employe: Employe) => api.put<Employe>(`/employes/${id}`, employe),
  delete: (id: number) => api.delete(`/employes/${id}`),
};

// Resource API calls
export const ressourceApi = {
  getAll: () => api.get<Ressource[]>('/api/resources'),
  getById: (id: number) => api.get<Ressource>(`/api/resources/${id}`),
  create: (ressource: Ressource) => api.post<Ressource>('/api/resources', ressource),
  update: (id: number, ressource: Ressource) => api.put<Ressource>(`/api/resources/${id}`, ressource),
  delete: (id: number) => api.delete(`/api/resources/${id}`),
};

// Types
export interface AuthResponse {
  token: string;
  tokenType: string;
}

export interface User {
  fullName: string;
  email: string;
}

// Auth API calls
export const authApi = {
  login: (email: string, password: string) => 
    api.post<AuthResponse>('/auth/login', { email, password }),
  
  register: (user: User, password: string) => 
    api.post<void>('/auth/register', { 
      fullName: user.fullName,
      email: user.email,
      password: password 
    }),
};

export default api; 
