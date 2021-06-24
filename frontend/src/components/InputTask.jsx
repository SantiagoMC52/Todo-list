/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  loadTasks, deleteTask, addTask, doneTask
} from '../redux/actions/actionCreators';
import '../App.css';

const InputTask = ({ tasks, dispatch }) => {
  const [newestTask, setNewestTask] = useState();

  useEffect(() => {
    if (!tasks.length) dispatch(loadTasks());
  }, []);

  const handleAdd = () => {
    const newTask = {
      name: newestTask,
      completed: false
    };
    dispatch(addTask(newTask));
  };

  function obtainTask(event) {
    setNewestTask(event.target.value);
  }

  function handleDelete(taskId) {
    dispatch(deleteTask(taskId));
  }

  function handleDone(task) {
    dispatch(doneTask(task));
  }

  return (
    <div className="main-container">
      <div className="input-container">
        <label htmlFor="task-input">
          ADD YOUR TASK:
          <input type="text" className="input-itSelf" id="task-input" value={newestTask} onChange={obtainTask} placeholder="Ex. Walk the dog" />
          <button type="button" className="addBtn" onClick={() => handleAdd()}>ADD</button>
        </label>
      </div>
      <div className="tasks-container">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={!task.completed ? 'task-item' : 'task-item--done'}>
              {task.name}
              <button type="button" className="doneBtn" onClick={() => handleDone(task)}>DONE</button>
              <button type="button" className="deleteBtn" onClick={() => handleDelete(task._id)}>DELETE</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

InputTask.propTypes = {
  map: PropTypes.func.isRequired,
  tasks: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({ tasks }) {
  return { tasks };
}

export default connect(mapStateToProps)(InputTask);
