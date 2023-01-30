const express = require('express');
const router = express.Router();
const getConn = require('../userDB');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const sessionObj = {
    key: 'loginData',
    secret: 'Cookie_Secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure:false,
        expires: 60*60*24,
    },
}

router.use(session(sessionObj));

router.get('/', async (req, res) => {
    res.render('mypage', {session: req.session.user});
    });

module.exports = router;
