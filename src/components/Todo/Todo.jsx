import React from 'react';
import { TodoType } from '../../types';

const classNames = require('classnames');

export const Todo = ({ todo, selectUser, isSelectedUser }) => (
  <li
    className={classNames(
      'TodoList__item', {
        'TodoList__item--checked': todo.completed,
        'TodoList__item--unchecked': !todo.completed,
      },
    )}
    key={todo.id}
  >
    <label>
      <input type="checkbox" readOnly />
      <p>{todo.title}</p>
    </label>

    <button
      className={classNames({
        'TodoList__user-button': true,
        'TodoList__user-button--selected': isSelectedUser,
        button: true,
      })}
      type="button"
      onClick={() => selectUser(todo.userId)}
    >
      {`User #${todo.userId}`}
    </button>
  </li>
);

Todo.propTypes = TodoType;
