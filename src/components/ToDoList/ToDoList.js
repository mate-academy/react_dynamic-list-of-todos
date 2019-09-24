import React from 'react';
import './ToDoList.css';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';

function ToDoList({ todos }) {
  return (
    <div className="todolist">
      {todos.map(item => (
        <ToDoItem todo={item} key={item.id} />
      ))}
    </div>
  );
}

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ToDoList;
