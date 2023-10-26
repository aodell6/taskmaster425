//server.js
   const express = require('express');
   const pool = require('./src/db');
   const cors = require('cors');
   const sql = require('mysql');

   const app = express();
   app.use(cors());
   app.use(express.json());

   // Get all tasks
   app.get('/tasks', (req, res) => {
     const request = new sql.Request(pool);
     request.query('SELECT * FROM TaskMasterDatabase.TaskDatabase', (error, result) => {
       if (error) {
         console.error('Error executing query:', error);
         res.status(500).send('Internal Server Error');
       } else {
         res.json(result.recordset);
       }
     });
   });

   // Add a new task
   app.post('/tasks', (req, res) => {
     const { title } = req.body;
     const request = new sql.Request(pool);
     request.input('title', sql.NVarChar, title);
     request.query('INSERT INTO TaskMasterDatabase.TaskDatabase (title) VALUES (@title)', (error) => {
       if (error) {
         console.error('Error executing query:', error);
         res.status(500).send('Internal Server Error');
       } else {
         request.query('SELECT * FROM TaskMasterDatabase.TaskDatabase', (error, result) => {
           if (error) {
             console.error('Error executing query:', error);
             res.status(500).send('Internal Server Error');
           } else {
             res.json(result.recordset);
           }
         });
       }
     });
   });

   // Delete a task
   app.delete('/tasks/:id', (req, res) => {
     const id = req.params.id;
     const request = new sql.Request(pool);
     request.input('id', sql.Int, id);
     request.query('DELETE FROM TaskMasterDatabase.TaskDatabase WHERE id = @id', (error) => {
       if (error) {
         console.error('Error executing query:', error);
         res.status(500).send('Internal Server Error');
       } else {
         res.json({ message: 'Task deleted' });
       }
     });
   });

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
