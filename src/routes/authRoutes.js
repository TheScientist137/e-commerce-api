import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import {
 signupController,
 loginController,
 logoutController,
 getCurrentUserController
} from '../controllers/authControllers.js';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/user', authenticateJWT, getCurrentUserController);

export default router;