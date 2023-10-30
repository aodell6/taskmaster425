    // src/db.js

    const express = require('express');
    const bodyParser = require('body-parser');
    const mysql = require('mysql');



    const pool = mysql.createPool({

        connectionLimit: 10,

        host: 'taskmasterdb.czmvuv6ephds.us-east-2.rds.amazonaws.com',

        user: 'admin',

        password: 'L4iFV7pbaWj7DA',

        database: 'TaskMasterDatabase',

        port: 3306,

    });

module.exports = pool;
