import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoutes from './src/routes/authRoutes.js';
import shopRoutes from './src/routes/shopRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import 'dotenv/config';

// App config
const app = express();
const PORT = process.env.PORT || 3000;

app.use(fileUpload());
app.use(express.json());
app.use(cors({ // Cross Origin Resource Sharing
 origin: 'http://localhost:5173', // Frontend URL
 credentials: true // Allow credentials (cookies, Authorization headers)
}));

app.use('/api/auth', authRoutes); // Authentication Routes
app.use('/api/shop', shopRoutes); // Shop Routes
app.use('/api/admin', adminRoutes); // Admin routes

app.listen(PORT, () => {
 console.log(`App listening on port: ${PORT}`);
});