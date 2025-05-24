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
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { tacheApi, projetApi, employeApi } from '../services/api';
import type { Tache, Projet, Employe } from '../types';

const Tasks: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Tache | null>(null);
  const [formData, setFormData] = useState<Tache>({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    statut: 'A_FAIRE',
    priorite: 'NORMALE',
    projetId: 0,
    responsableId: undefined
  });

  const { data: taches, isLoading: loadingTaches } = useQuery<Tache[]>({
    queryKey: ['taches'],
    queryFn: () => tacheApi.getAll().then(res => res.data)
  });

  const { data: projets, isLoading: loadingProjets } = useQuery<Projet[]>({
    queryKey: ['projets'],
    queryFn: () => projetApi.getAll().then(res => res.data)
  });

  const { data: employes, isLoading: loadingEmployes } = useQuery<Employe[]>({
    queryKey: ['employees'],
    queryFn: () => employeApi.getAll().then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (tache: Tache) => tacheApi.create(tache),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taches'] });
      handleClose();
    }
  });

  const updateMutation = useMutation({
    mutationFn: (tache: Tache) => tacheApi.update(tache.id!, tache),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taches'] });
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => tacheApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taches'] });
    }
  });

  const handleOpen = (tache?: Tache) => {
    if (tache) {
      setEditingTask(tache);
      setFormData(tache);
    } else {
      setEditingTask(null);
      setFormData({
        titre: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        statut: 'A_FAIRE',
        priorite: 'NORMALE',
        projetId: projets?.[0]?.id || 0,
        responsableId: undefined
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      updateMutation.mutate({ ...formData, id: editingTask.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      deleteMutation.mutate(id);
    }
  };

  if (loadingTaches || loadingProjets || loadingEmployes) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Tâches</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Nouvelle Tâche
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Projet</TableCell>
              <TableCell>Responsable</TableCell>
              <TableCell>Date Début</TableCell>
              <TableCell>Date Fin</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Priorité</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taches?.map((tache) => (
              <TableRow key={tache.id}>
                <TableCell>{tache.titre}</TableCell>
                <TableCell>{tache.description}</TableCell>
                <TableCell>
                  {projets?.find(p => p.id === tache.projetId)?.nom}
                </TableCell>
                <TableCell>
                  {employes?.find(e => e.id === tache.responsableId)?.nom}
                </TableCell>
                <TableCell>{new Date(tache.dateDebut).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(tache.dateFin).toLocaleDateString()}</TableCell>
                <TableCell>{tache.statut}</TableCell>
                <TableCell>{tache.priorite}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(tache)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(tache.id!)}>
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
            {editingTask ? 'Modifier la tâche' : 'Nouvelle tâche'}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                label="Titre"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
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
              <FormControl required>
                <InputLabel>Projet</InputLabel>
                <Select
                  value={formData.projetId}
                  onChange={(e) => setFormData({ ...formData, projetId: Number(e.target.value) })}
                  label="Projet"
                >
                  {projets?.map((projet) => (
                    <MenuItem key={projet.id} value={projet.id}>
                      {projet.nom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Responsable</InputLabel>
                <Select
                  value={formData.responsableId || ''}
                  onChange={(e) => setFormData({ ...formData, responsableId: Number(e.target.value) || undefined })}
                  label="Responsable"
                >
                  <MenuItem value="">Aucun</MenuItem>
                  {employes?.map((employe) => (
                    <MenuItem key={employe.id} value={employe.id}>
                      {employe.nom} {employe.prenom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                <MenuItem value="A_FAIRE">À faire</MenuItem>
                <MenuItem value="EN_COURS">En cours</MenuItem>
                <MenuItem value="TERMINE">Terminé</MenuItem>
                <MenuItem value="EN_PAUSE">En pause</MenuItem>
              </TextField>
              <TextField
                select
                label="Priorité"
                value={formData.priorite}
                onChange={(e) => setFormData({ ...formData, priorite: e.target.value })}
                required
              >
                <MenuItem value="BASSE">Basse</MenuItem>
                <MenuItem value="NORMALE">Normale</MenuItem>
                <MenuItem value="HAUTE">Haute</MenuItem>
                <MenuItem value="URGENTE">Urgente</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained">
              {editingTask ? 'Modifier' : 'Créer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Tasks; 