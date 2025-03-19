import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import shopRoutes from './src/routes/shopRoutes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (images)

app.use(express.json());
app.use(cors({ // Cross Origin Resource Sharing
 origin: 'http://localhost:5173', // Frontend URL
 credentials: true // Allow credentials (cookies, Authorization headers)
}));

app.use('/api/auth', authRoutes); // Authentication Routes
app.use('/api/shop', shopRoutes); // Shop Routes

app.listen(PORT, () => {
 console.log(`App listening on port: ${PORT}`);
});