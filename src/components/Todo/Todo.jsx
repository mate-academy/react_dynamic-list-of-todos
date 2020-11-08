import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TodoPropTypes } from '../propTypes/TodoPropTypes';

export const Todo = ({
  todo: { completed, userId, title },
  selectUser,
  selectedUserId,
}) => (
  <div
    className={classNames({
      TodoList__item: true,
      'TodoList__item--checked': completed,
      'TodoList__item--unchecked': !completed,
    })}
  >
    <label>
      <input type="checkbox" readOnly checked={completed} />
      <p>{title}</p>
    </label>

    <button
      className={classNames({
        button: true,
        'TodoList__user-button': true,
        'TodoList__user-button--selected':
          selectedUserId === userId,
      })}
      type="button"
      onClick={() => selectUser(userId)}
    >
      {`User #${userId}`}
    </button>
  </div>
);

Todo.propTypes = {
  todo: PropTypes.shape(TodoPropTypes).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
