const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: String,
  completed: Boolean
});

module.exports = mongoose.model('tasks', taskSchema);
