import express from 'express';
import passport from 'passport';
import authController from '../controllers/authController.js';
import '../strategies/local-strategy.js';

const router = express.Router();

router.post('/signup', authController.registerController);
router.post('/login', passport.authenticate('local'), authController.loginController);
router.get('/status', authController.statusController);

export default router;