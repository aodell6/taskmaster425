const express = require('express');

const bodyParser = require('body-parser');

const mysql = require('mysql');

 

const app = express();

const port = 3001;

 

app.use(bodyParser.json());

 

// Database configuration

const db = mysql.createConnection({

    host: 'taskmasterdb.czmvuv6ephds.us-east-2.rds.amazonaws.com',

    user: 'admin',

    password: 'L4iFV7pbaWj7DA',

    database: 'TaskMasterDatabase',

    port: "3306",
});

 

db.connect((err) => {

  if (err) {

    console.error('Database connection failed: ' + err.stack);

    return;

  }

  console.log('Connected to the database');

});

 

// Define your API routes here

 

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});