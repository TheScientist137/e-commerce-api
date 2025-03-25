import express from 'express';
import { signupController, loginController, logoutController } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/logout', logoutController);

export default router;