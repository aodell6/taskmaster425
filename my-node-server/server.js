const express = require('express');

const bodyParser = require('body-parser');

const mysql = require('mysql');



const app = express();

const port = 3001;



app.use(bodyParser.json());

app.use(express.json())



// Database configuration

const db = mysql.createConnection({

    host: 'taskmasterdb.czmvuv6ephds.us-east-2.rds.amazonaws.com',

    user: 'admin',

    password: 'L4iFV7pbaWj7DA',

    database: 'TaskMasterDatabase',

    port: "3306",

    connectTimeout: 10000,

    acquireTimeout: 10000
});



db.connect((err) => {

  if (err) {

    console.error('Database connection failed: ' + err.stack);

    return;

  }

  console.log('Connected to the database');

});



// Define your API routes here

//get all Data
app.get('/database', (req, res) => {

  const query = 'SELECT * FROM TaskDatabase';



  db.query(query, (err, results) => {

    if (err) {

      console.error('Database query error: ' + err.message);

      res.status(500).send('Error retrieving data');

      return;

    }



    return res.json(results);

  });

});

app.get('/database', (req, res) => {



  const user = req.para

  const query = 'SELECT * FROM TaskDatabase where ';



  db.query(query, (err, results) => {

    if (err) {

      console.error('Database query error: ' + err.message);

      res.status(500).send('Error retrieving data');

      return;

    }



    return res.json(results);

  });

});

app.post("/database", (req, res) =>{
  const q = "INSERT INTO TaskDatabase ('UserID', 'TaskTitle', 'TaskDescription', 'TaskType', 'DueDate' VALUES (?)"

  const values = [
    req.body.user,
    req.body.title,
    req.body.desc,
    req.body.type,
    req.body.date]
  db.query(q, [values], (req, res)=>{
    if (err) {

      console.error('Database query error: ' + err.message);

      res.status(500).send('Error retrieving data');

      return;

    }



    return res.json("Task Created"));
  })
})


app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});
