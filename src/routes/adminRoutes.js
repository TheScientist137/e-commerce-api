import express from 'express';
import { addTelescopeController, addMountController } from '../controllers/adminController';
import { authenticateJWT, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/new-telescope', authenticateJWT, isAdmin, addTelescopeController);
router.post('/new-mount', authenticateJWT, isAdmin, addMountController);

export default router;