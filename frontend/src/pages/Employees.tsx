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
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { employeApi } from '../services/api';
import type { Employe } from '../types';

const Employees: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employe | null>(null);
  const [formData, setFormData] = useState<Employe>({
    nom: '',
    prenom: '',
    email: '',
    poste: '',
    equipe: ''
  });
  const [error, setError] = useState<string | null>(null);

  const { data: employes, isLoading } = useQuery<Employe[]>({
    queryKey: ['employees'],
    queryFn: () => employeApi.getAll().then(res => res.data)
  });

  const createMutation = useMutation({
    mutationFn: (employe: Employe) => employeApi.create(employe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      handleClose();
      setError(null);
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || 'Erreur lors de la création de l\'employé.');
    }
  });

  const updateMutation = useMutation({
    mutationFn: (employe: Employe) => employeApi.update(employe.id!, employe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => employeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    }
  });

  const handleOpen = (employe?: Employe) => {
    if (employe) {
      setEditingEmployee(employe);
      setFormData(employe);
    } else {
      setEditingEmployee(null);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        poste: '',
        equipe: ''
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEmployee(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (editingEmployee) {
      updateMutation.mutate({ ...formData, id: editingEmployee.id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
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
        <Typography variant="h4">Employés</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Nouvel Employé
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Poste</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employes?.map((employe) => (
              <TableRow key={employe.id}>
                <TableCell>{employe.nom}</TableCell>
                <TableCell>{employe.prenom}</TableCell>
                <TableCell>{employe.email}</TableCell>
                <TableCell>{employe.poste}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(employe)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employe.id!)}>
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
            {editingEmployee ? 'Modifier l\'employé' : 'Nouvel employé'}
          </DialogTitle>
          <DialogContent>
            {error && (
              <Box mb={2}>
                <Typography color="error">{error}</Typography>
              </Box>
            )}
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                label="Nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
              />
              <TextField
                label="Prénom"
                value={formData.prenom}
                onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                required
              />
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <TextField
                label="Poste"
                value={formData.poste}
                onChange={(e) => setFormData({ ...formData, poste: e.target.value })}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button type="submit" variant="contained">
              {editingEmployee ? 'Modifier' : 'Créer'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Employees; 
