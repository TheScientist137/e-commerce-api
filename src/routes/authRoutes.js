import express from 'express';
import authControllers from '../controllers/authControllers.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

// Check aunthentication 

router.post('/signup', authControllers.signupController);
router.post('/login', authControllers.loginController);
router.post('/logout', authControllers.logoutController);

export default router;