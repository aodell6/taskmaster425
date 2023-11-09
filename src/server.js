const express = require('express');

const pool = require('./db');

const cors = require('cors');



const app = express();

app.use(cors());

app.use(express.json());


app.get('/', (req, res) =>{
  res.json({message: "Welcome to the db connection"});
})

// Get all tasks

app.get('/tasks', (req, res) => {

  pool.query('SELECT * FROM TaskDatabase', (error, results) => {

    if (error) throw error;

    res.json(results);

  });

});

app.get('/tasks/:userID', (req, res) => {
    const userID = req.userID;
    pool.query('SELECT * FROM TaskDatabase WHERE UserID=?;', [userID], (error, results) => {
        if(error) throw error;
        res.json(results);
    });
})

// Add a new task

app.post('/post/:userID/:taskTitle/:description/:type/:date', (req, res) => {

  console.log(req.params)
  const userID = req.params.userID;
  const taskTitle = req.params.taskTitle;
  const description = req.params.description;
  const type = Number(req.params.type);
  const date = req.params.date.replaceAll("%2D", "-");

  pool.query("INSERT INTO TaskDatabase ('UserID', 'Title', 'Description', 'Type', 'Date') VALUES (" + userID + ", " + taskTitle + ", " + description + ", " + type + ", " + date + "); COMMIT;", [], (error, results) => {

    if (error) throw error;

    pool.query('SELECT * FROM tasks', (error, results) => {

      if (error) throw error;

      res.json(results);

    });

    res.json({pushed: "Successful in query"});
  });

  res.json({pushed: "Successful out query"});

});

app.get('/login/:userID&:password', (req, res) => {

    const userID = req.userID;
    const password = req.password;


    pool.query("SELECT * FROM LoginDatabase WHERE UserID=? AND Password=?", [userID, password], (error, results) => {
        if (error) throw error;
        res.json(results);
    });
})

app.post('/login/:userID&:password1&:password2', (req, res) => {

    const userID = req.userID;
    const password1 = req.password1;
    const password2 = req.password2;

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

app.delete('/tasks/:userID&:taskID', (req, res) => {

  const userID = req.userID;
  const taskID = req.taskID;

  pool.query('DELETE FROM tasks WHERE UserID = ? AND TaskID=?', [userID, taskID], (error, results) => {

    if (error) throw error;

    res.json({ message: 'Task deleted' });

  });

});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
