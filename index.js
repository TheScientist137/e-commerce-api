import express from 'express';
import session from 'express-session';

const app = express();
const PORT = 3000

app.use(session({
 secret: 'secret',
 saveUninitialized: false,
 resave: false,
 cookie: { maxAge: 6000 * 60 } // 1h
}));

app.get('/', (req, res) =>  {
 res.send('Hello World');
});

app.listen(PORT, () => {
 console.log(`App listening on port:, ${PORT}`);
});