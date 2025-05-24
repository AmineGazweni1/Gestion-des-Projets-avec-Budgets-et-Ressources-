import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
  MenuItem
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { projetApi } from '../services/api';
import type { Projet } from '../types';

const Projects: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Projet | null>(null);
  const [formData, setFormData] = useState<Projet>({
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    statut: 'EN_COURS',
    budget: 0
  });

  const { data: projets, isLoading } = useQuery<Projet[]>({
    queryKey: ['projets'],
    queryFn: () => projetApi.getAll().then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (projet: Projet) => projetApi.create(projet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projets'] });
      handleClose();
    }
  });

  const updateMutation = useMutation({
    mutationFn: (projet: Projet) => projetApi.update(projet.id!, projet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projets'] });
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => projetApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projets'] });
    }
  });

  const handleOpen = (projet?: Projet) => {
    if (projet) {
      setEditingProject(projet);
      setFormData(projet);
    } else {
      setEditingProject(null);
      setFormData({
        nom: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        statut: 'EN_COURS',
        budget: 0
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateMutation.mutate({ ...formData, id: editingProject.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Projets</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Nouveau Projet
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date Début</TableCell>
              <TableCell>Date Fin</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projets?.map((projet) => (
              <TableRow key={projet.id}>
                <TableCell>{projet.nom}</TableCell>
                <TableCell>{projet.description}</TableCell>
                <TableCell>{new Date(projet.dateDebut).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(projet.dateFin).toLocaleDateString()}</TableCell>
                <TableCell>{projet.statut}</TableCell>
                <TableCell>{projet.budget.toLocaleString()} €</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(projet)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(projet.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingProject ? 'Modifier le projet' : 'Nouveau projet'}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                label="Nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={3}
                required
              />
              <TextField
                label="Date de début"
                type="date"
                value={formData.dateDebut}
                onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                label="Date de fin"
                type="date"
                value={formData.dateFin}
                onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                select
                label="Statut"
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                required
              >
                <MenuItem value="EN_COURS">En cours</MenuItem>
                <MenuItem value="TERMINE">Terminé</MenuItem>
                <MenuItem value="EN_PAUSE">En pause</MenuItem>
                <MenuItem value="ANNULE">Annulé</MenuItem>
              </TextField>
              <TextField
                label="Budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained">
              {editingProject ? 'Modifier' : 'Créer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Projects; 