import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

export const Todo = ({ selectUser, todo, handleChange }) => (
  <li
    className={classNames('TodoList__item', {
      'TodoList__item--unchecked': !todo.completed,
      'TodoList__item--checked': todo.completed,
    })}
    key={todo.id}
  >
    <label>
      <input
        id={todo.id}
        type="checkbox"
        checked={todo.completed}
        onChange={handleChange}
      />
      <p>{todo.title}</p>
    </label>
    <button
      name={todo.userId}
      className={classNames('TodoList__user-button', 'button', {
        'TodoList__user-button--selected': todo.selected,
      })}
      type="button"
      onClick={(e) => {
        selectUser(e.target.name);
      }}
    >
      User&nbsp;#
      {todo.userId}
    </button>
  </li>
);

export const todoType = {
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

Todo.propTypes = {
  selectUser: PropTypes.func.isRequired,
  todo: todoType.isRequired,
  handleChange: PropTypes.func.isRequired,
};
