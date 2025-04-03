import express from 'express';
import { authenticateJWT, isAdmin } from '../middleware/authMiddleware.js';
import { 
 addMountController,
 updateMountController,
 deleteMountController } from '../controllers/mountsController.js';
import {
 addTelescopeController,
 updateTelescopeController,
 deleteTelescopeController
} from '../controllers/telescopesController.js';

const router = express.Router();

// Telescopes Routes
router.post('/telescopes', authenticateJWT, isAdmin, addTelescopeController);
router.put('/telescopes/:id', authenticateJWT, isAdmin, updateTelescopeController);
router.delete('/telescopes/:id', authenticateJWT, isAdmin, deleteTelescopeController);

// Mounts Routes
router.post('/mounts', authenticateJWT, isAdmin, addMountController);
router.put('/mounts/:id', authenticateJWT, isAdmin, updateMountController);
router.delete('/mounts/:id', authenticateJWT, isAdmin, deleteMountController);

export default router;