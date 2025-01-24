import express from 'express';
import passport from 'passport';
import authControllers from '../controllers/authControllers.js';
import '../strategies/local-strategy.js';

const router = express.Router();

router.post('/signup', authControllers.signupController);
router.post('/login', passport.authenticate('local'), authControllers.loginController);
router.post('/logout', authControllers.logoutController);
router.get('/user', authControllers.currentUserController);

export default router;