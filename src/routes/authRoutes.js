import express from 'express';
import authControllers from '../src/controllers/authControllers.js';
import { authenticateJWT } from '../src/middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', authControllers.signupController);
router.post('/login', authControllers.loginController);
router.post('/logout', authControllers.logoutController);
router.get('/user', authenticateJWT,  authControllers.currentSessionController);

export default router;