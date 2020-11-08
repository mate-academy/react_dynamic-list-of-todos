import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todo, selectUser, selectedUserId }) => (
  // eslint-disable-next-line
  <li className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}>
    <label>
      <input type="checkbox" readOnly />
      <p>{todo.title}</p>
    </label>

    <button
      // eslint-disable-next-line
      className={`TodoList__user-button ${selectedUserId === todo.userId ? 'TodoList__user-button--selected' : ''} button`}
      type="button"
      onClick={() => selectUser(todo.userId)}
    >
      {`User: #${todo.userId}`}
    </button>
  </li>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  }).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
