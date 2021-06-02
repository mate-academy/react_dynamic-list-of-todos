import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Todo.scss';

export const Todo = ({ todo, selectUser }) => (
  <li
    className={classNames(
      'Todo__item',
      { 'Todo__item--unchecked': !todo.completed },
      { 'Todo__item--checked': todo.completed },
    )}
  >

    <label>
      <input type="checkbox" disabled={todo.completed} />
      <p>{todo.title}</p>
    </label>

    <button
      className="button"
      type="button"
      onClick={() => selectUser(todo.userId)}
    >
      User&nbsp;
      {todo.userId}
    </button>
  </li>

);

Todo.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectUser: PropTypes.func.isRequired,
};
