const express = require('express');

const pool = require('./src/db');

const cors = require('cors');



const app = express();

app.use(cors());

app.use(express.json());



// Get all tasks

app.get('/tasks', (req, res) => {

  pool.query('SELECT * FROM tasks', (error, results) => {

    if (error) throw error;

    res.json(results);

  });

});

app.get('/task:userID', (req, res) => {
    pool.query('SELECT * FROM TaskDatabase WHERE UserID=?;', (error, results) => {
        if(error) throw error;
        res.json(results);
    });
})

// Add a new task

app.post('/tasks:userID, taskTitle, description, type, date', (req, res) => {

  const { userID, taskTitle, description, type, date } = req.body;

  pool.query("INSERT INTO TaskDatabase ('UserID', 'Title', 'Description', 'Type', 'Date') VALUES (?, ?, ?, ?, ?);", [userID, taskTitle, description, type, date], (error, results) => {

    if (error) throw error;

    pool.query('SELECT * FROM tasks', (error, results) => {

      if (error) throw error;

      res.json(results);

    });

  });

});

app.get('/login:userID, password', (req, res) => {
    const {userID, password} = req.params;

    pool.query("SELECT * FROM LoginDatabase WHERE UserID=? AND Password=?", [userID, password], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
})

app.post('/login:userID, password1, password2', (req, res) => {
    const {userID, "userID, password1, password2", password2} = req.params;

    if(password1 === password2){
        pool.query("SELECT * FROM LoginDatabase WHERE UserID=? AND Password=?", [userID, password], (error, results) => {
            if (error) throw error;
            res.json(results);
        });
    }
    else{
        res.json({"match" : false});
    }
})



// Delete a task

app.delete('/tasks/:userID, taskID', (req, res) => {

  const {userID, taskID} = req.params;

  pool.query('DELETE FROM tasks WHERE UserID = ? AND TaskID=?', [userID, taskID], (error, results) => {

    if (error) throw error;

    res.json({ message: 'Task deleted' });

  });

});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
