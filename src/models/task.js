const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  EndDate: String,
  Title: String,
  Owner: Number,
  Description : String,
  TaskType : Number,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
