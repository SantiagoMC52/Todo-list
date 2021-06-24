/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import actionTypes from './actionTypes';

const URL = 'http://localhost:2021/tasks';

export function loadTasks() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(URL);
      dispatch({
        type: actionTypes.LOAD_TASKS,
        tasks: data
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_TASKS_ERROR'
      });
    }
  };
}

export function addTask(task) {
  return async (dispacth) => {
    const { data } = await axios.post(URL, task);
    dispacth({
      type: actionTypes.ADD_TASK,
      task: data
    });
  };
}

export function deleteTask(taskId) {
  return async (dispacth) => {
    await axios.delete(`${URL}/${taskId}`);
    dispacth({
      type: actionTypes.DELETE_TASK,
      taskId
    });
  };
}

export function doneTask(task) {
  return async (dispacth) => {
    const { data } = await axios.put(`${URL}/${task._id}`, {
      completed: true
    });
    dispacth({
      type: actionTypes.DONE_TASK,
      task: data
    });
  };
}
