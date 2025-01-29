import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(session({
 secret: 'secret',
 saveUninitialized: false,
 resave: false,
 cookie: { maxAge: 6000 * 60 * 60 }, name: 'auth' // 1h
}));

app.use(passport.initialize()); // Initialize passport middleware
app.use(passport.session()); // Session manager middleware (Integrates express-session with passport)

app.use(express.json()); // JSON request body middleware
app.use(cors({
 origin: 'http://localhost:5173', // frontend url
 credentials: true // Permite que las cookies viajen entre solicitudes
})); 

app.use('/api/auth', authRoutes); // Authentication Routes
app.use('/api/shop', shopRoutes); // Shop Routes

app.listen(PORT, () => {
 console.log(`App listening on port: ${PORT}`);
});