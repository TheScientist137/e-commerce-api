import express from 'express';
import authRoutes from './routes/authRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes); // Authentication Routes
app.use('/api/shop', shopRoutes); // Shop Routes

app.listen(PORT, () => {
 console.log(`App listening on port: ${PORT}`);
});