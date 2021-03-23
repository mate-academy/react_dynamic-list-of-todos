import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Todo = ({ onUserSelect,
  selectedUserId,
  completed,
  userId,
  title }) => (
    <li
      onClick={() => onUserSelect(userId)}
      className={classNames(`TodoList__item`, {
        'TodoList__item--checked': completed,
        'TodoList__item--unchecked': !completed,
      })}
    >
      <label>
        <input type="checkbox" readOnly />
        <p>{title}</p>
      </label>

      <button
        className={classNames(`
        TodoList__user-button button`, {
          'TodoList__user-button--selected': userId === selectedUserId,
        })}
        type="button"
      >
        User #
        {userId}
      </button>
    </li>
);

Todo.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
