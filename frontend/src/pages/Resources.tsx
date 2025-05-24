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
  Switch,
  FormControlLabel,
  MenuItem
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ressourceApi } from '../services/api';
import type { Ressource } from '../types';

const Resources: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Ressource | null>(null);
  const [formData, setFormData] = useState<Ressource>({
    name: '',
    description: '',
    type: 'MATERIEL',
    available: true
  });

  const { data: ressources, isLoading } = useQuery<Ressource[]>({
    queryKey: ['ressources'],
    queryFn: () => ressourceApi.getAll().then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (ressource: Ressource) => ressourceApi.create(ressource),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ressources'] });
      handleClose();
    }
  });

  const updateMutation = useMutation({
    mutationFn: (ressource: Ressource) => ressourceApi.update(ressource.id!, ressource),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ressources'] });
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => ressourceApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ressources'] });
    }
  });

  const handleOpen = (ressource?: Ressource) => {
    if (ressource) {
      setEditingResource(ressource);
      setFormData(ressource);
    } else {
      setEditingResource(null);
      setFormData({
        name: '',
        description: '',
        type: 'MATERIEL',
        available: true
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingResource(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting resource:', formData); // Ajoutez ce log pour déboguer
    if (editingResource) {
      updateMutation.mutate({ ...formData, id: editingResource.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
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
        <Typography variant="h4">Ressources</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Nouvelle Ressource
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Coût</TableCell>
              <TableCell>Disponibilité</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ressources?.map((ressource) => (
              <TableRow key={ressource.id}>
                <TableCell>{ressource.name}</TableCell>
                <TableCell>{ressource.type}</TableCell>
                <TableCell>{ressource.cout.toLocaleString()} €</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={ressource.available}
                        onChange={() => {
                          updateMutation.mutate({
                            ...ressource,
                            available: !ressource.available
                          });
                        }}
                        color="primary"
                      />
                    }
                    label={ressource.available ? 'Disponible' : 'Indisponible'}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(ressource)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(ressource.id!)}>
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
            {editingResource ? 'Modifier la ressource' : 'Nouvelle ressource'}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                label="Nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <TextField
                select
                label="Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <MenuItem value="MATERIEL">Matériel</MenuItem>
                <MenuItem value="LOGICIEL">Logiciel</MenuItem>
                <MenuItem value="HUMAIN">Humain</MenuItem>
                <MenuItem value="AUTRE">Autre</MenuItem>
              </TextField>
              <TextField
                label="Coût"
                type="number"
                value={formData.cout}
                onChange={(e) => setFormData({ ...formData, cout: Number(e.target.value) })}
                required
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    color="primary"
                  />
                }
                label="Disponible"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained">
              {editingResource ? 'Modifier' : 'Créer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Resources; 
