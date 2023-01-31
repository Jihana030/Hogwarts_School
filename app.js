const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const { parentPort } = require('worker_threads');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));

const loginRouter = require('./routes/login');
app.use('/main', loginRouter);

const joinRouter = require('./routes/join');
app.use('/join', joinRouter);

const mypageRouter = require('./routes/mypage');
app.use('/mypage', mypageRouter);

const logoutRouter = require('./routes/logout');
app.use('/logout', logoutRouter);

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/static', express.static(__dirname + '/static'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`서버 실행 포트번호 ${port}`);
});