import React from 'react';
import { Todo } from './Todo/Todo';
import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

        {/* <li className="TodoList__item TodoList__item--checked">
          <label>
            <input type="checkbox" checked readOnly />
            <p>distinctio vitae autem nihil ut molestias quo</p>
          </label>

          <button
            className="TodoList__user-button button"
            type="button"
          >
            User&nbsp;#2
          </button>
        </li> */}
