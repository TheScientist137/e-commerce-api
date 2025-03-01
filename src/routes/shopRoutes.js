import express from 'express';
import shopControllers from '../controllers/shopControllers.js';

const router = express.Router();   

router.get('/telescopes', shopControllers.showTelescopesController); // Show all telescopes
router.get('/telescopes/:id', shopControllers.showTelescopeByIdController); // Show telescope by id

export default router;