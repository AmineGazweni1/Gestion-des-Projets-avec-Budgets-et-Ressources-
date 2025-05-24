import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { projetApi, tacheApi, employeApi, ressourceApi } from '../services/api';
import type { Projet, Tache, Employe, Ressource } from '../types';

const Dashboard: React.FC = () => {
  const { data: projets, isLoading: loadingProjets } = useQuery<Projet[]>({
    queryKey: ['projets'],
    queryFn: () => projetApi.getAll().then(res => res.data)
  });

  const { data: taches, isLoading: loadingTaches } = useQuery<Tache[]>({
    queryKey: ['taches'],
    queryFn: () => tacheApi.getAll().then(res => res.data)
  });

  const { data: employes, isLoading: loadingEmployes } = useQuery<Employe[]>({
    queryKey: ['employees'],
    queryFn: () => employeApi.getAll().then(res => res.data)
  });

  const { data: ressources, isLoading: loadingRessources } = useQuery<Ressource[]>({
    queryKey: ['ressources'],
    queryFn: () => ressourceApi.getAll().then(res => res.data)
  });

  if (loadingProjets || loadingTaches || loadingEmployes || loadingRessources) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Projets
            </Typography>
            <Typography variant="h4">
              {projets?.length || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tâches
            </Typography>
            <Typography variant="h4">
              {taches?.length || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Employés
            </Typography>
            <Typography variant="h4">
              {employes?.length || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ressources
            </Typography>
            <Typography variant="h4">
              {ressources?.length || 0}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Projets récents
            </Typography>
            {projets?.slice(0, 5).map((projet) => (
              <Box key={projet.id} mb={2}>
                <Typography variant="subtitle1">
                  {projet.nom}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {projet.description}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tâches urgentes
            </Typography>
            {taches?.filter(t => t.priorite === 'HAUTE').slice(0, 5).map((tache) => (
              <Box key={tache.id} mb={2}>
                <Typography variant="subtitle1">
                  {tache.titre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tache.description}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Ressources disponibles
            </Typography>
            {ressources?.filter(r => r.disponibilite).slice(0, 5).map((ressource) => (
              <Box key={ressource.id} mb={2}>
                <Typography variant="subtitle1">
                  {ressource.nom}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {ressource.type}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 