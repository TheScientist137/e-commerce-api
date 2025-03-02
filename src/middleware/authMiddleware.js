import { verifyToken } from "../scripts/jwt";

export const authenticateJWT = (req, res, next) => {
 // Extract token from header "Authorization"
 const authHeader = req.headers.authorization;
 
 if (!authHeader || !authHeader.startsWith("Bearer "))
  return res.status(401).json({ message: 'Unauthorized: No token provided' });

 // Extract token (eliminate Bearer)
 const token = authHeader.split(' ')[1];

 try {
  const decoded = verifyToken(token);
  req.user = decoded; // Add user info to req.user
  
  next(); // Continue with next controller
 } catch (error) {
  if (error.name === 'TokenExpiredError')
   return res.status(401).json({ message: 'Unauthorized: Token expired' });

  console.error('Error verifying token:', error)
  res.status(401).json({ message: 'Unauthorized: Invalid token' });
 }
}