/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  onSelectUserID(userId: number) : void;
  selectID: number;
}

export const TodoList: React.FC<Props> = ({ todos, onSelectUserID, selectID }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => {
          return (
            <li
              key={todo.id}
              className={todo.completed
                ? 'TodoList__item TodoList__item--checked'
                : 'TodoList__item TodoList__item--unchecked'}
            >
              <label>
                <input type="checkbox" readOnly checked={todo.completed} />
                <p>{todo.title}</p>
              </label>

              <button
                className={selectID === todo.userId
                  ? 'TodoList__user-button TodoList__user-button--selected button'
                  : 'TodoList__user-button button'}
                type="button"
                onClick={() => {
                  onSelectUserID(todo.userId);
                }}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);
