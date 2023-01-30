const express = require('express');
const router = express.Router();
const getConn = require('../userDB');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const MemoryStore = require('memorystore')(session);

router.get('/', async (req, res) => {
    res.render('join');
}); //회원가입 연결

router.post('/', async (req, res) => {
const data = req.body;

const sql = `
INSERT INTO user
    (id, pw, house, u_name)
    VALUES
    ('${data.u_id}', '${data.u_pw}', 'none', '${data.u_name}')
`;

getConn(conn => {
    conn.query(sql, (err, rows, fields) => {
        if(!err) {
            console.log(rows);
            // res.redirect('/login');
        }            
    });
    conn.release();
})

});

module.exports = router;