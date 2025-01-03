import express from 'express';
import shopControllers from '../controllers/shopControllers.js';

const router = express.Router();   

// Applies ensureAuthenticated() to all the routes (req.user exists?)
// This router (all routes) use this middleware
router.use((req, res, next) => 
 req.isAuthenticated() ? 
 next() : 
 res.status(401).json({ message: 'not authorized' }));

router.get('/telescopes', shopControllers.showTelescopesController); // Show all telescopes
router.get('/telescopes/:id', shopControllers.showTelescopeByIdController); // Show telescope by id
router.get('/telescopes/type/:typeId', shopControllers.showTelescopesByTypeIdController); // Show telescope by typeId

export default router;statusController