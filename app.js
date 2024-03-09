const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], credentials: true, exposedHeaders: ['Set-Cookie'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.post('/api/v1/login', async (req, res) => {

    res.cookie('refresh', 'sample-refresh', { secure: true, sameSite: 'none', httpOnly: true, path: '/' });

    return res.status(200).json({ status: 200, data: [], message: 'Success' })
});

app.get('/api/sample/test', async (req, res) => {

    const cookie = req.cookies.refresh;

    return res.json({ cookie, cookie_headers: req.headers.cookie })
})

module.exports = app;