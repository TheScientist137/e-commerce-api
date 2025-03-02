import express from 'express';
import shopControllers from '../controllers/shopControllers.js';

const router = express.Router();

// Apply authmiddleware to all routes

router.get('/telescopes', shopControllers.showTelescopesController);
router.get('/telescopes/:id', shopControllers.showTelescopeByIdController);

export default router;