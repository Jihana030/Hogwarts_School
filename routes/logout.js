const express = require('express');
const router = express.Router();
const session = require('express-session');

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
        console.log('로그아웃');
        req.session.destroy(err => {
                if (err) {
                    console.log('세션 삭제 에러');
                    return;
                }
                res.clearCookie('session-cookie')
                console.log(req.session);
                console.log('세션 삭제 성공');
                res.redirect('/main');
            }
        ); 
    });

module.exports = router;
