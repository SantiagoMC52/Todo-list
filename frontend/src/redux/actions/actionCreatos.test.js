import axios from 'axios';
import actionTypes from './actionTypes';
import {
  loadTasks, addTask, deleteTask, doneTask
} from './actionCreators';

jest.mock('axios');

describe('loadHeroes', () => {
  test('should dispatch LOAD_HEROES_ERROR', async () => {
    const loadTasksResponse = loadTasks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
    });
    const dispatch = jest.fn();
    await loadTasksResponse(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'LOAD_TASKS_ERROR'
    });
  });
});

describe('addTasks from Axios', () => {
  test('should dispatch ADD_TASK', async () => {
    const mockedTask = { data: 'Skylab' };
    const dispatch = jest.fn();
    axios.post.mockResolvedValue(mockedTask);

    await addTask(mockedTask)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_TASK,
      task: 'Skylab'
    });
  });
});

describe('deleteTask from Axios', () => {
  test('should dispatch DELETE_TASK', async () => {
    const dispatch = jest.fn();
    axios.delete.mockResolvedValue(1);

    await deleteTask(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DELETE_TASK,
      taskId: 1
    });
  });
});

describe('doneTask from Axios', () => {
  test('should dispatch DONE_TASK', async () => {
    const dispatch = jest.fn();
    axios.put.mockResolvedValue(1);

    await doneTask(1)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.DONE_TASK
    });
  });
});
