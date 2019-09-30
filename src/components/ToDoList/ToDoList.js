import React from 'react';
import './ToDoList.css';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';

const ToDoList = ({ todos, sotring }) => (
  <div>
    <button
      type="button"
      value="name"
      onClick={sotring}
    >
      Sort by Name
    </button>
    <button
      type="button"
      value="title"
      onClick={sotring}
    >
      Sort by Title
    </button>
    <button
      type="button"
      value="completed"
      onClick={sotring}
    >
      Sort by Completed
    </button>
    <div className="todolist">
      {todos.map(item => (
        <ToDoItem todo={item} key={item.id} />))}
    </div>
  </div>
);

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      sotring: PropTypes.func,
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default ToDoList;
