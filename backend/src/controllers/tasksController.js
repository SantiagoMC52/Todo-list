const Task = require('../model/taskModel');

function tasksController() {
  async function createOne(req, res) {
    const newTask = new Task(req.body);
    try {
      await newTask.save();
      res.json(newTask);
    } catch (error) {
      res.send(error);
    }
  }

  async function getAll(req, res) {
    const tasks = await Task.find();
    res.json(tasks);
  }

  async function deleteById(req, res) {
    try {
      await Task.findByIdAndDelete(req.params.taskId);
      res.status(204);
      res.json();
    } catch (error) {
      res.send(error);
    }
  }

  async function updateById(req, res) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.taskId,
        req.body,
        { new: true }
      );
      res.json(updatedTask);
    } catch (error) {
      res.send(error);
    }
  }

  return {
    createOne,
    getAll,
    deleteById,
    updateById
  };
}

module.exports = tasksController;
