import express from 'express';
import { authenticateJWT, isAdmin } from '../middleware/authMiddleware.js';
import {
 addProductController,
 updateProductController,
 deleteProductController
} from '../controllers/productsController.js';

const router = express.Router();

router.post('/products', authenticateJWT, isAdmin, addProductController);
router.put('/products/:id', authenticateJWT, isAdmin, updateProductController);
router.delete('/products/:id', authenticateJWT, isAdmin, deleteProductController);

export default router;