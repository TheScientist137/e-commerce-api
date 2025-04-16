import express from 'express';
import { authenticateJWT, isAdmin } from '../middleware/authMiddleware.js';
import uploadImageController from '../controllers/imageController.js';
import {
 addProductController,
 updateProductController,
 deleteProductController
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/products', authenticateJWT, isAdmin, addProductController);
router.put('/products/:id', authenticateJWT, isAdmin, updateProductController);
router.delete('/products/:id', authenticateJWT, isAdmin, deleteProductController);

router.post('/images/:id', uploadImageController);

export default router;