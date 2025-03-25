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
router.put('/update-telescope', authenticateJWT, isAdmin, updateTelescopeController);
router.delete('/delete-telescope', authenticateJWT, isAdmin, deleteTelescopeController);

// Mounts Routes
router.post('/new-mount', authenticateJWT, isAdmin, addMountController);
router.put('/update-mount', authenticateJWT, isAdmin, updateMountController);
router.delete('/delete-mount', authenticateJWT, isAdmin, deleteMountController);

export default router;