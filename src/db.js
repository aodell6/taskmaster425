    // src/db.js

    const express = require('express');
    const bodyParser = require('body-parser');
    const mysql = require('mysql');



    const pool = mysql.createConnection({

        connectionLimit: 10,

        host: 'taskmasterdb.czmvuv6ephds.us-east-2.rds.amazonaws.com',

        user: 'admin',

        password: 'L4iFV7pbaWj7DA',

        port : 3306,

        database: 'TaskMasterDatabase',

    });

    pool.connect(function(err) {
        if (err) {
          console.error('Database connection failed: ' + err.stack);
          return;
        }

        console.log('Connected to database.');
      });

module.exports = pool;
