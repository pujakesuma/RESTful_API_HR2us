const mysql = require("mysql"); //declare variabel mysql database
const connect = mysql.createConnection({ //setup connection database
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
});

connect.connect (function(err) {
    if (err) throw err;
});

module.exports = connect; //db will re-use connection
