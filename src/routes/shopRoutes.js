import express from 'express';
import { showTelescopesController, showMountsController } from '../controllers/shopControllers';

const router = express.Router();

// Apply auth authmiddleware to specified routes

router.get('/telescopes', showTelescopesController);
router.get('/mounts', showMountsController);

export default router;