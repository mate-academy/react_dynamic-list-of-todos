import React from 'react';
import { TodoShape } from './TodoShape';

const classNames = require('classnames');

export const Todo = ({ todos, selectUserId, selectedUserId }) => (
  <div className="TodoList__list-container">
    <ul className="TodoList__list">
      {todos.map(todo => (
        <li
          className={
            classNames({
              TodoList__item: true,
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })
          }
          key={todo.id}
        >
          <label>
            {
              todo.completed
                ? <input type="checkbox" checked readOnly />
                : <input type="checkbox" readOnly />
            }
            <p>{todo.title}</p>
          </label>

          <button
            className={
              classNames({
                button: true,
                'TodoList__user-button': true,
                'TodoList__user-button--selected':
                   selectedUserId === todo.userId,
              })
            }
            type="button"
            onClick={() => selectUserId(todo.userId)}
          >
            {`User #${todo.userId}`}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

Todo.propTypes = TodoShape;
