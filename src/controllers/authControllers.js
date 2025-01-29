import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const signupController = async (req, res) => {
 const { name, email, password } = req.body;
 try {
  const findUser = await prisma.user.findUnique({ where: { email: email } });
  if (findUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({ data: { name, email, hashedPassword }});
  res.status(201).json({ message: 'Success registration', newUser });
 } catch (error) {
  res.status(500).json({ message: 'Error in registration', error });
 }
}
console.log();
const loginController = async (req, res) =>  {
 try { // mirar stados de respuesta!!
  res.status(200).json({ message: 'Loggued succesfully', user: req.user.name });
 } catch(error) {
  res.status(500).json({ message: 'Server error during loging' });
 }
}

// Mejorar logout controller!
const logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Failed to destroy session", error: err.message }); 

    res.redirect('/');
    console.log('logued out');
  });
};
// comprobar si la cookie persiste los datos de compra al hacer logout

const currentSessionController = (req, res) => {
  if (req.user || req.isAuthenticated()) {
    return res.json({ user: req.user.name }); // utilizarlo en el frontend despuews de sacar alos perros
  }
  return res.json({ user: undefined });
}

export default { signupController, currentSessionController, loginController, logoutController };