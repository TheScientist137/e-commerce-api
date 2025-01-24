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

const loginController = async (req, res) =>  {
 try { // mirar stados de respuesta!!
  res.status(200).json({ message: 'Loggued succesfully', user: req.user.name });
 } catch(error) {
  res.status(500).json({ message: 'Server error during loging' });
 }
}

// Mejorar logout controller!
const logoutController = (req, res) => {
 req.logout((err) => {
  if (err) return next(err);
  console.log('logued out');
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Failed to destroy session", error: err.message });

  res.redirect('/');
 });
});
};
// comprobar si la cookie persiste los datos de compra al hacer logout

const currentUserController = (req, res) => {
 if (!req.isAuthenticated() || !req.user) {
  req.logout((err) => {
    if (err) return next(err);
    console.log('logued out');
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: "Failed to destroy session", error: err.message });
  
    res.redirect('/');
      });
    });
  }
  res.json(req.user.name);
}

export default { signupController, currentUserController, loginController, logoutController };