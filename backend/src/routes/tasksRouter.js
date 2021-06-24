const { Router } = require('express');
const tasksController = require('../controllers/tasksController')();

function tasksRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(tasksController.getAll)
    .post(tasksController.createOne);

  routes
    .route('/:taskId')
    .delete(tasksController.deleteById)
    .put(tasksController.updateById);

  return routes;
}

module.exports = tasksRouter();
