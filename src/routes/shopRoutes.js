import express from 'express';
import { showTelescopesController } from '../controllers/telescopesController.js';
import { showMountsController, showMountTypesController } from '../controllers/mountsController.js';
import { getProductByIdController, getProductsController } from '../controllers/productsController.js';

const router = express.Router();

router.get('/products', getProductsController);
router.get('/products/:id', getProductByIdController);
router.get('/telescopes', showTelescopesController);
router.get('/mounts', showMountsController);

export default router;