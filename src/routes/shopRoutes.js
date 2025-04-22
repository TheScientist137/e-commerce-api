import express from 'express';
import {
 getTelescopesController,
 getMountsController,
 getProductsController,
 getProductByIdController
} from '../controllers/shopController.js';

const router = express.Router();

router.get('/products', getProductsController);
router.get('/products/:id', getProductByIdController);
router.get('/telescopes', getTelescopesController);
router.get('/mounts', getMountsController);

export default router;