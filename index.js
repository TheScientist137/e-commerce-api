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

app.get('/', (req, res) => {
 console.log(req.session);
 console.log(req.session.id);
 req.session.visited = true; // Base endpoint to save the session (stores cookie on sessionStore)
 res.send('Hello World!');
});

app.get('/api/test', (req, res) => {
 console.log(req.session.id);
 res.send('test');
});

app.listen(PORT, () => {
 console.log(`App listening on port:, ${PORT}`);
});