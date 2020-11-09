import React from 'react';
import classNames from 'classnames';
import { TodoShape } from '../Shapes/TodoShape';

export const Todo = ({ completed, title, userId, handleСhangeUserId }) => (
  <>
    <label>
      <input
        type="checkbox"
        readOnly
        checked={completed}
      />
      <p>{title}</p>
    </label>

    <button
      className={
        classNames(
          'button',
          {
            'TodoList__user-button--selected': completed,
          },
        )
      }
      type="button"
      onClick={() => handleСhangeUserId(userId)}
    >
      User #
      {userId}
    </button>
  </>
);

Todo.propTypes = TodoShape;

Todo.defaultProps = {
  userId: 0,
  completed: false,
};
