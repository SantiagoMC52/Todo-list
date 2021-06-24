const {
  getAll,
  deleteById,
  updateById
} = require('./tasksController')();
const Task = require('../model/taskModel');

jest.mock('../model/taskModel');

describe('getAll', () => {
  test('should get all tasks', async () => {
    const res = {
      json: jest.fn()
    };

    Task.find.mockResolvedValueOnce([{
      id: 1,
      name: 'Buy bread',
      completed: false
    }]);

    await getAll(null, res);

    expect(res.json).toHaveBeenCalledWith([{
      id: 1,
      name: 'Buy bread',
      completed: false
    }]);
  });
});

describe('deleteById', () => {
  test('should return json', async () => {
    const req = {
      params: { taskId: null }
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };

    await deleteById(req, res);

    expect(res.json).toHaveBeenCalledWith();
  });

  test('should return send error', async () => {
    const req = {
      params: { taskId: null }
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn()
    };

    Task.findByIdAndDelete.mockRejectedValueOnce('error');

    await deleteById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('updateById', () => {
  test('should return json', async () => {
    const req = {
      params: { taskId: null },
      body: {}
    };

    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    await updateById(req, res);

    expect(res.json).toHaveBeenCalled();
  });

  test('should return send with error', async () => {
    const req = {
      params: { taskId: null },
      body: {}
    };

    const res = {
      json: jest.fn(),
      send: jest.fn()
    };

    Task.findByIdAndUpdate.mockRejectedValueOnce('error');

    await updateById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});
