import bcrypt from "bcrypt";
import pool from "../scripts/db.js";
import { generateToken } from "../scripts/jwt.js";

const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    // Check if the user already exists in db
    const findUserQuery = await pool.query('SELECT * FROM users WHERE email =  $1', [email]);
    const user = findUserQuery.rows[0];
    if (user) return res.status(400).json({ message: 'Email already in use' })

    // Hash password and insert new user in db
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserQuery = await pool.query(
      'INSERT INTO users (name, email, hashedPassword) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    const newUser = newUserQuery.rows[0];

    res.status(201).json({ message: 'Success registration', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error in registration', error: error.message });
  }
}

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    // Find user in db by email
    const findUserQuery = await pool.query('SELECT * FROM users WHERE email =  $1', [email]);
    const user = findUserQuery.rows[0];

    // Check if user exists
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Check password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.hashedpassword);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = generateToken(user.id);
    console.log(user);

    res.status(200).json({ message: 'Login succesfully', token, user: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
}

// Mejorar logout controller!
const logoutController = (req, res) => {
  try {
    res.status(200).json({ message: 'Loggued out succesfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error during logout', error: error.message });
  }
}

const currentSessionController = async (req, res) => {
  try {
    // Obtain user from authenticateJWT middleware
    const currentUser = req.user;
    if (!currentUser) return res.status(401).json({ message: 'Not authenticated' });

    // Obtain additional user info from db
    const userQuery = await pool.query('SELECT id, name, email FROM users WHERE id = $1',
      [currentUser.userId]);
    const user = userQuery.rows[0];

    res.status(200).json({ user: user });
  } catch (error) {

  }
}

export default {
  signupController,
  loginController,
  logoutController,
  currentSessionController
};