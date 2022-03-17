/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';

import { Todo } from '../../react-app-env';

type TodoListType = {
  todos: Todo[],
  selectId: (id: number) => void,
};

export const TodoList: React.FC<TodoListType> = ({ todos, selectId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li className="TodoList__item TodoList__item--unchecked" key={todo.id}>
            <label>
              <input type="checkbox" />
              <p>delectus aut autem</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => selectId(todo.userId)}
            >
              {`User#${todo.userId}`}
            </button>
          </li>
        ))}
        <li className="TodoList__item TodoList__item--unchecked">
          <label>
            <input type="checkbox" readOnly />
            <p>delectus aut autem</p>
          </label>

          <button
            className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
            type="button"
          >
            User&nbsp;#1
          </button>
        </li>

        <li className="TodoList__item TodoList__item--checked">
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
        </li>
      </ul>
    </div>
  </div>
);
