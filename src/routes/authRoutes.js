import express from 'express';
import authControllers from '../controllers/authControllers.js';

const router = express.Router();

router.post('/signup', authControllers.signupController);
//router.post('/logout', authControllers.logoutController);
//router.get('/user', authControllers.currentSessionController);

export default router;