const maria = require('mysql');

const pool = maria.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '0317',
    database: 'uiuxboard',
    connectionLimit: 5
});

function getConnection(cb) {
    pool.getConnection((err, conn) => {
        if(err) {
            console.log(err);
            return;
        }
        cb(conn);
    });
}
module.exports = getConnection;