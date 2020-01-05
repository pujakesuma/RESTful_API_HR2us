const mysql = require("mysql");
const connect = mysql.createConnection({
    port: process.env.APP_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
});

connect.connect (function(err) {
    if (err) throw err;
});

module.exports = connect;
