import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

export const Todo = ({ todo, onButtonClick, isSelectedUser }) => (
  <li
    className={classNames({
      TodoList__item: true,
      'TodoList__item--checked': todo.completed,
      'TodoList__item--unchecked': !todo.completed,
    })}
    key={todo.id}
  >
    <label>
      <input type="checkbox" readOnly />
      <p>{todo.title}</p>
    </label>

    <button
      className={classNames({
        'TodoList__user-button': true,
        'TodoList__user-button--selected': isSelectedUser,
        button: true,
      })}
      type="button"
      onClick={() => onButtonClick(todo.userId)}
    >
      {`User #${todo.userId}`}
    </button>
  </li>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  isSelectedUser: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
