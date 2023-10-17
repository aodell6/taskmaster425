const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = 2999;

// Connect to MongoDB
mongoose.connect('mongodb://ec2-user@ec2-3-19-57-242.us-east-2.compute.amazonaws.com:27017/TaskMasterTask', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Use task routes
app.use('/api', taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
