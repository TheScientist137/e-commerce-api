import { verifyToken } from "../config/jwt.js";

// Auithenticate JasonWebTokens Middleware Controller
export const authenticateJWT = (req, res, next) => {
 const authHeader = req.headers.authorization;  // Extract token from header "Authorization"
 
 if (!authHeader || !authHeader.startsWith("Bearer "))
  return res.status(401).json({ message: 'Unauthorized: No token provided' });

 const token = authHeader.split(' ')[1];  // Extract token ( and eliminate Bearer)

 try {
  // Add user info to req.user for next controller
  const decoded = verifyToken(token);
  req.user = decoded; // { id, email, role }
  
  next(); // Continue with next controller
 } catch (error) {
  if (error.name === 'TokenExpiredError')
   return res.status(401).json({ message: 'Unauthorized: Token expired' });

  console.error('Error verifying token:', error)
  res.status(401).json({ message: 'Unauthorized: Invalid token' });
 }
}

// isAdmin Middleware Controller
export const isAdmin = (req, res, next) => {
 if (req.user?.role !== 'admin') {
  return res.status(403).json({ message: 'Unauthorized. You need admin credentials' });
 }

 next(); // Continue with next controller
}