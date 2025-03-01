import bcrypt from "bcrypt";
import pool from "../scripts/db.js";


const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const findUserQuery = await pool.query('SELECT * FROM users WHERE email =  $1', [email]);
    const findUser = findUserQuery.rows[0];
    if (findUser) return res.status(400).json({ message: 'Email already in use' })

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

}

// Mejorar logout controller!
const logoutController = (req, res) => {

};

export default {
  signupController,
  loginController,
  logoutController
};