const express = require('express');
const router = express.Router();
const getConn = require('../userDB');
const session = require('express-session'); //세션관리용 미들웨어
const fileStore = require('session-file-store')(session);

router.use(session({
    secure: true, // https 환경에서만 session 정보를 주고받도록처리
    secret: 'Cookie_Secret',
    resave: false,
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    cookie: {
        httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
        secure:false,
    },
    store: new fileStore(),
    name: 'session-cookie',
}));

router.get('/', async (req, res) => {
    const user = req.session;
    console.log(user.user);
    res.render('index', {user});
    });

router.post('/', async (req, res) => {
    const u_id = req.body.u_id, u_pw = req.body.u_pw;
    const sql = `SELECT * FROM user where id='${u_id}'`;

    const loginInfo = [u_id, u_pw];
    getConn(conn => {
        conn.query(sql, loginInfo[0], (err, row, fields) => {
            if(err) console.log(err);

            if(row.length){
                if(loginInfo[1] !== row[0].pw){
                    console.log('비밀번호가 일치하지 않음');
                    res.send("<script>alert('비밀번호가 일치하지 않습니다'); history.back();</script>");

                } else {
                    console.log('로그인 성공');

                    req.session.user = {
                        userId: row[0].id,
                        userName: row[0].u_name
                    };
                    console.log(req.session);

                    res.redirect('/main');
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
