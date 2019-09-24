import React from 'react';
import './ToDoItem.css';
import PropTypes from 'prop-types';
import User from '../User/User';

function ToDoItem({ todo }) {
  return (
    <div className={todo.completed ? 'todo-item' : 'todo-item completed'}>
      <ul className="todo-item-list">
        <li className="todo-item-list__item-status item">
          {todo.completed ? '\u2714' : '\u2717'}
          {todo.id}
        </li>
        <li className="todo-item-list__item-article item">{todo.title}</li>
      </ul>
      <User user={todo.user} />
    </div>
  );
}

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
};

export default ToDoItem;
