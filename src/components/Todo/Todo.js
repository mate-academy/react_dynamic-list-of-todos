import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todo, selectUser }) => (
  <li
    key={todo.id}
    className={
      `TodoList__item TodoList__item--${
        !todo.completed ? 'un' : ''
      }checked`
    }
  >
    <label>
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
      />
      <p>{todo.title}</p>
    </label>

    <button
      className="
        TodoList__user-button
        TodoList__user-button--selected
        button
      "
      type="button"
      onClick={() => selectUser(todo.userId)}
    >
      User&nbsp;#
      {todo.userId}
    </button>
  </li>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    completed: PropTypes.bool,
    title: PropTypes.string,
    userId: PropTypes.number,
  }).isRequired,
  selectUser: PropTypes.func.isRequired,
};
