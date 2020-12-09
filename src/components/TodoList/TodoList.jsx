import React from 'react';
import uuid from 'uuid-random';
import './TodoList.scss';
import { TodoListTypes } from './TodoListTypes';

export const TodoList = ({ todos, updateSelectUserId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li className="TodoList__item TodoList__item--unchecked" key={uuid()}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => updateSelectUserId(todo.userId)}
            >
              {`User#${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = TodoListTypes;
