import React from 'react';
import ClassNames from 'classnames';
import { TodoProps } from '../../props/TodoProps';

export const Todo = ({ completed, title, userId, handleСhangeUserId }) => (
  <>
    <label>
      <input type="checkbox" readOnly checked={completed} />
      <p>{title}</p>
    </label>

    <button
      className={ClassNames('TodoList__user-button', 'button', {
        'TodoList__user-button--selected': completed,
      })}
      type="button"
      onClick={() => handleСhangeUserId(userId)}
    >
      {'User #'}
      {userId}
    </button>
  </>
);

Todo.propTypes = TodoProps;

Todo.defaultProps = {
  userId: 0,
  completed: false,
};
