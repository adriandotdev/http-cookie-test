const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.post('/api/v1/login', async (req, res) => {

    res.cookie('refresh', 'sample-refresh', { httpOnly: true, sameSite: true })

    return res.status(200).json({ status: 200, data: [], message: 'Success' })
});

app.get('/api/sample/test', async (req, res) => {

    const cookie = req.cookies.refresh;

    return res.json({ cookie })
})

module.exports = app;