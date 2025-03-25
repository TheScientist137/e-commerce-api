import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './src/routes/authRoutes.js';
import shopRoutes from './src/routes/shopRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (images) form public folder
app.use('/images', express.static(path.join(__dirname, '/public/images')));

app.use(express.json());
app.use(cors({ // Cross Origin Resource Sharing
 origin: 'http://localhost:5173', // Frontend URL
 credentials: true // Allow credentials (cookies, Authorization headers)
}));

app.use('/api/auth', authRoutes); // Authentication Routes
app.use('/api/shop', shopRoutes); // Shop Routes
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
 console.log(`App listening on port: ${PORT}`);
});