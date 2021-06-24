/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from '../utils/test-utils';
import {
  addTask, deleteTask, doneTask, loadTasks
} from '../redux/actions/actionCreators';
import InputTask from './InputTask';

jest.mock('../redux/actions/actionCreators');

describe('Given InputTask component', () => {
  describe('When is rendered with one task', () => {
    test('Then the task name should be in the document', async () => {
      const initialState = { tasks: [{ name: 'Walk the dog' }] };
      render(<InputTask />, { initialState });
      expect(screen.getByText(/Walk the dog/i)).toBeInTheDocument();
    });
  });
});

describe('Given InputTask component', () => {
  let initialState;
  beforeEach(() => {
    initialState = { tasks: [{ name: 'Walk the dog' }] };
    render(<InputTask />, { initialState });
  });

  describe('When ADD button is clicked', () => {
    test('Then addTask should be invoked', async () => {
      addTask.mockImplementationOnce(() => ({ type: 'add' }));
      fireEvent.click(screen.getByRole('button', { name: /ADD/i }));
      expect(addTask).toHaveBeenCalled();
    });
  });

  describe('When DONE button is clicked', () => {
    test('Then doneTask should be invoked', async () => {
      doneTask.mockImplementationOnce(() => ({ type: 'done' }));
      fireEvent.click(screen.getByText(/DONE/i));
      expect(doneTask).toHaveBeenCalled();
    });
  });

  describe('When DELETE button is clicked', () => {
    test('Then deleteTask should be invoked', async () => {
      deleteTask.mockImplementationOnce(() => ({ type: 'delete' }));
      fireEvent.click(screen.getByText(/DELETE/i));
      expect(deleteTask).toHaveBeenCalled();
    });
  });

  test('should call loadTasks', () => {
    loadTasks.mockReturnValue({ type: '' });
    render(<InputTask />, {
      initialState: {
        tasks: []
      }
    });
    expect(loadTasks).toHaveBeenCalled();
  });
});

describe('<InputTask/>', () => {
  test('should show ADD YOUR TASK:', () => {
    const initialState = { tasks: [{}] };
    render(<InputTask />, { initialState });
    expect(screen.getByText(/ADD YOUR TASK:/i)).toBeInTheDocument();
  });
});
