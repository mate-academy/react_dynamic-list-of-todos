import React from 'react';
import './ToDoItem.css';
import PropTypes from 'prop-types';
import User from '../User/User';

const ToDoItem = ({ todo }) => (
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

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }).isRequired,

};

export default ToDoItem;
