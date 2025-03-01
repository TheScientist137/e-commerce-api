import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

// Generate token
export const generateToken = (userId) => {
 return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

// Verify token
export const verifyToken = (token) => {
 return jwt.verify(token, JWT_SECRET);
}