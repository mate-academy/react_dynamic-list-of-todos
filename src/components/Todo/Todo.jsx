import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ userId, title, completed, onUserClick }) => (
  <li
    className={`TodoList__item
      TodoList__item--${completed ? '' : 'un'}checked`
    }
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
