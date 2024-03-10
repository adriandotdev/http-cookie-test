const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'https://react-refresh-project.onrender.com'], methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], credentials: true, exposedHeaders: ['Set-Cookie'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


const users = [{

    username: 'user1',
    password: 'password',
    role: 'admin'
}, { username: 'user2', password: 'password', role: 'cashier' }];

app.post('/api/v1/login', (req, res) => {

    const { username, password } = req.body;

    const user = users.some(user => user.username === username && user.password === password);

    if (!user) return res.status(401);

    const accessToken = jwt.sign({ username, role: user.role }, 'access-key');
    const refreshToken = jwt.sign({ username, role: user.role }, 'refresh-key');

    res.cookie('access-token', accessToken, { secure: true, sameSite: 'none', httpOnly: true, path: '/' });
    res.cookie('refresh-token', refreshToken, { secure: true, sameSite: 'none', httpOnly: true, path: '/' });

    return res.status(200).json({ status: 200 });
})

app.get('/api/v1/verify', (req, res) => {

    const accessToken = req.cookies['access-token'];

    if (!accessToken) return res.status(401).json({ status: 401 })

    try {
        jwt.verify(accessToken, 'access-key');
    }
    catch (err) {
        if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) return res.status(401).json({ status: 401 })

        return res.status(500).json({ status: 500 })
    }

    return res.status(200).json({ status: 200 })
})
app.get('/api/v1/logout', (req, res) => {

    res.clearCookie('access-token');
    res.clearCookie('refresh-token');
    res.status(200).json({ status: 200, message: 'Logged out successfully' })
})
module.exports = app;