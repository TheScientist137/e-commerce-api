import express from 'express';
import passport from 'passport';
import authControllers from '../controllers/authControllers.js';
import '../strategies/local-strategy.js';

const router = express.Router();

router.post('/signup', authControllers.registerController);
router.post('/login',
passport.authenticate('local', { failureRedirect: '/login' }),
 (req, res) => res.redirect('/api/shop/telescopes')
);

export default router;