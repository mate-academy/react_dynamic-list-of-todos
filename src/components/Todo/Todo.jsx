import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Todo = ({ userId, title, completed, onUserClick }) => (
  <li
    className={(classNames('TodoList__item',
      { 'TodoList__item--unchecked': completed }))}
  >
    <label>
      <input type="checkbox" checked={completed} readOnly />
      <p>{title}</p>
    </label>

    <button
      className="TodoList__user-button button"
      type="button"
      onClick={() => onUserClick(userId)}
    >
      User&nbsp;#
      {userId}
    </button>
  </li>
);

Todo.defaultProps = {
  userId: 0,
  completed: false,
  title: 'No title',
};

Todo.propTypes = {
  userId: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  onUserClick: PropTypes.func.isRequired,
};

export { Todo };
