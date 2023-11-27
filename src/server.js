const express = require('express');
const bodyParser = require("body-parser");

const cors = require('cors');

const dbOperation = require("/dbOperations")


const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', async (req, res) =>{
  res.json({message: "Welcome to the db connection"});
})

// Get all tasks

app.get('/getUserTask', async (req, res) => {
  console.log("getUserTask")
  const result = await dbOperation.getTask(req.body);
  console.log(result);
  res.json(result.recordset)
})

// Add a new task

app.post('/addTask', async (req, res) => {
  console.log("addTask");
  dbOperation.createTask(req.body);
});

app.get('/authLogin', async (req, res) => {
  console.log("userLogin");
  res.json(await dbOperation.getUser(req.body))
})

app.post('/newLogin', async (req, res) => {
  console.log("newLogin");
  res.json(await dbOperation.createUser(req.body))
});


app.delete('/removeTask', async (req, res) => {
  console.log("removeTask");
  await dbOperation.deleteTask(req.body);
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
