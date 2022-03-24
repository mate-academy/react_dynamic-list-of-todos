/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import classnames from 'classnames';
import { TodoType } from '../../react-app-env';

export const TodoItem: React.FC<TodoType> = ({
  todo, selectId, selectedUserId, changeCompleted,
}) => {
  return (
    <li
      className={classnames(
        'TodoList__item',
        { 'TodoList__item--unchecked': !todo.completed },
        { 'TodoList__item--checked': todo.completed },
      )}

    >
      <label>
        <input type="checkbox" checked={todo.completed} onChange={() => changeCompleted(todo.id)} />
        <p>{todo.title}</p>
      </label>

      <button
        className={classnames(
          'button',
          'TodoList__user-button',
          { 'TodoList__user-button--selected': selectedUserId === todo.userId },
        )}
        type="button"
        onClick={() => selectId(todo.userId)}
      >
        {`User#${todo.userId}`}
      </button>
    </li>
  );
};
