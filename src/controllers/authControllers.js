import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const registerController = async (req, res) => {
 const { name, email, password } = req.body;
 try {
  const findUser = await prisma.user.findUnique({ where: { email: email } });
  if (findUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({ data: { name, email, hashedPassword }});
  res.status(201).json({ message: 'Success registration', newUser });
 } catch (error) {
  console.error('Error creating new user', error);
 }
}

const statusController = async (req, res) => {
 console.log('Inside status endpoint');
 return req.user ? res.send(req.user) : res.sendStatus(401);
}

export default { registerController, statusController };