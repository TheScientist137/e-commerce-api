import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import './strategies/local-strategy.js';

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();


app.use(session({
 secret: 'secret',
 saveUninitialized: false,
 resave: false,
 cookie: { maxAge: 6000 * 60 } // 1h
}));

app.use(passport.initialize()); // Initialize passport middleware
app.use(passport.session()) // Session manager middleware (Integrates express-session with passport)
app.use(express.json()); // JSON request body middleware

app.get('/', (req, res) =>  {
 res.send('Hello World');
});

app.post('/api/auth/new', async (req, res) => {
 const { name, email, password } = req.body;

 try {
  const findUser = await prisma.user.findUnique({ where: { email: email } });
  if (findUser) throw new Error('Email already in use');

  const newUser = await prisma.user.create({ data: { name, email, password }});
  res.status(201).json({ message: 'Success registration', newUser });
 } catch (error) {
  console.error('Error creating new user', error);
 }
});

app.post('/api/auth', passport.authenticate('local'), (req, res) => {
 res.sendStatus(200);
});

app.get('/api/auth/status', (req, res) => {
 console.log('Inside status endpoint');
 console.log(req.user);
 return req.user ? res.send(req.user) : res.sendStatus(401);
});

app.listen(PORT, () => {
 console.log(`App listening on port:, ${PORT}`);
});