const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password1",
    database: "department_db"
},

);


module.exports = connection