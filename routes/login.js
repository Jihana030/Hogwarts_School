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
    res.render('ticket', {session: req.session.user});
    }); //로그인 연결

router.post('/', async (req, res) => {
    const u_id = req.body.u_id, u_pw = req.body.u_pw;
    const sql = `SELECT * FROM user where id='${u_id}'`;

    const user = [u_id, u_pw];
    getConn(conn => {
        conn.query(sql, user[0], (err, row, fields) => {
            if(err) console.log(err);

            if(row.length){
                if(user[1] !== row[0].pw){
                    console.log('비밀번호가 일치하지 않음');
                    res.send("<script>alert('비밀번호가 일치하지 않습니다'); history.back();</script>");

                } else {
                    console.log('로그인 성공');
                    const [, privateKey] = req.headers.cookie.split('=');
                    const userInfo = session[privateKey];

                    req.session.user = user;
                    console.log(req.session);

                    res.send("<script>alert('너 내 동료가 돼라'); location.href = document.referrer;</script>");
                }
            }else {
                console.log('아이디가 존재하지 않습니다');
                res.send("<script>alert('등록되지 않은 학생입니다'); history.back();</script>");
            }
        });
        conn.release();
    })
});

module.exports = router;
