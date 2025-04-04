import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import pool from "../config/db.js";
// import 'dotenv/config';

export const signupController = async (req, res) => { // role: user
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    // Check if the user already exists in db
    const findUserQuery = await pool.query('SELECT * FROM users WHERE email =  $1', [email]);
    const user = findUserQuery.rows[0];
    if (user) return res.status(400).json({ message: 'Email already in use' });

    // Hash password and insert new user in db (first position of the array)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserQuery = await pool.query(
      'INSERT INTO users (name, email, hashedPassword) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    const newUser = newUserQuery.rows[0];

    // Iniciamos sesion directamente??????

    res.status(201).json({ message: 'Success registration', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error in registration', error: error.message });
  }
}

export const loginController = async (req, res) => {
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
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: '1h' } // expiration time
    );

    res.status(200).json({ message: 'Login succesfully', token, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ message: 'Server error - Error during login' });
  }
}

export const logoutController = (req, res) => {
  try {
    res.status(200).json({ message: 'Loggued out succesfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error during logout', error: error.message });
  }
}

export const getCurrentUserController = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await pool.query(
      'SELECT id, name, email, role, cart FROM users WHERE id = $1',
      [userId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User obtained succesfully', result: user.rows[0] });
  } catch (error) {
    console.error('Error obtaining current user', error);
    res.status(500).json({ message: 'Server error - Error obtaining current user' });
  }
}
