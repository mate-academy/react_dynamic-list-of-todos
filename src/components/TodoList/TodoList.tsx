import React from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {
          todos.map(todo => (
            <li className="TodoList__item TodoList__item--unchecked">
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))
        }
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
