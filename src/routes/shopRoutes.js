import express from 'express';
import {
 getTelescopesController,
 getMountsController,
 getProductsController,
 getProductByIdController,
 getProductsTypesController
} from '../controllers/shopController.js';

const router = express.Router();

router.get('/products', getProductsController);
router.get('/telescopes', getTelescopesController);
router.get('/mounts', getMountsController);
router.get('/products/types', getProductsTypesController);
router.get('/products/:id', getProductByIdController);

export default router;