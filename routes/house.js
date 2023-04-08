const express = require('express');
const router = express.Router();
const session = require('express-session');
const fileStore = require('session-file-store')(session);

router.use(session({
    secure: true, // https 환경에서만 session 정보를 주고받도록처리
    secret: 'Cookie_Secret',
    resave: false,
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    cookie: {
        httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
        secure:false,
        expires: 60*60*24,
    },
    store: new fileStore(),
    name: 'session-cookie',
}));


router.get('/', async (req, res) => {
    const user = req.session;
    res.render('house_list', {user});
    });

router.get('/gryffindor', async (req, res) => {
        const user = req.session;
        res.render('house_detail_G', {user});
    });

module.exports = router;
