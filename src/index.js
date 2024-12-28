import express from 'express';
import session from 'express-session';
import passport from 'passport';

const app = express();
const PORT = 3000

app.use(session({
 secret: 'secret',
 saveUninitialized: false,
 resave: false,
 cookie: { maxAge: 6000 * 60 } // 1h
}));

app.use(passport.initialize()); // Initialize passport middleware
app.use(passport.session()) // Session manager middleware (Integrates express-session with passport)

app.get('/', (req, res) =>  {
 res.send('Hello World');
});

app.listen(PORT, () => {
 console.log(`App listening on port:, ${PORT}`);
});