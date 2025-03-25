import express from 'express';
import { authenticateJWT, isAdmin } from '../middleware/authMiddleware.js';
import { 
 addTelescopeController, 
 updateTelescopeController,
 deleteTelescopeController,
 addMountController,
 updateMountController,
 deleteMountController } from '../controllers/adminController.js';

const router = express.Router();

// Telescopes Routes
router.post('/new-telescope', authenticateJWT, isAdmin, addTelescopeController);
router.put('/update-telescope/:id', authenticateJWT, isAdmin, updateTelescopeController);
router.delete('/delete-telescope/:id', authenticateJWT, isAdmin, deleteTelescopeController);

// Mounts Routes
router.post('/new-mount', authenticateJWT, isAdmin, addMountController);
router.put('/update-mount/:id', authenticateJWT, isAdmin, updateMountController);
router.delete('/delete-mount/:id', authenticateJWT, isAdmin, deleteMountController);

export default router;