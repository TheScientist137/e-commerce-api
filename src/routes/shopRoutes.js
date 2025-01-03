import express from 'express';
import shopControllers from '../controllers/shopControllers.js';

const router = express.Router();   

// Show all telescopes
router.get('/telescopes', shopControllers.showTelescopesController);
// Show telescope by id
router.get('/telescopes/:id', shopControllers.showTelescopeByIdController);
// Show telescope by typeId
router.get('/telescopes/type/:typeId', shopControllers.showTelescopesByTypeIdController);

export default router;