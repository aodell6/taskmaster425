const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    charset : "utf8mb4",
    connect_timeout : timeout,
    db : "defaultdb",
    host : "mysql-d51f41f-nathan-a42e.a.aivencloud.com",
    password : "AVNS_3kWPcqsUyzZ8o_Ylw1a",
    read_timeout : timeout,
    port : 21984,
    user : "avnadmin",
    write_timeout : timeout,
});

module.exports = pool;
