import express from 'express';
import shopControllers from '../controllers/shopControllers.js';

const router = express.Router();

// Apply authmiddleware to specified routes
// router.use(authenticateJWT);

router.get('/telescopes', shopControllers.showTelescopesController);

export default router;