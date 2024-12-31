import passport from "passport";
import { Strategy } from "passport-local";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Local Passport Authentication Strategy Class

// Authentication function proccess
export default passport.use(new Strategy({ usernameField: 'email' }, async (username, password, done) => {
 console.log(`Username: ${username}`);
 console.log(`Password: ${password}`);
 
 try {
  const findUser = await prisma.user.findUnique({ where: { email: username } });

  if (!findUser) throw new Error('User not found!');
  if (findUser.password !== password) throw new Error('Wrong password!');

  done(null, findUser);
 } catch (error) {
  done(error, null);
 }
}));

// Seralize User function
passport.serializeUser((user, done) => {
 console.log('Inside serialize user');
 done(null, user.id);
});

// Deserialize User function
passport.deserializeUser(async (id, done) => {
 console.log('Inside Deserialize user');
 console.log(`Deserializing user id: ${id}`);
 try {
  const findUserById = await prisma.user.findUnique({where: {id: id}});
  if (!findUserById) throw new Error('User not found');
  
  done(null, findUserById);
 } catch (error) {
  done(error, null)
 }
});
