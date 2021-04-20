import React from 'react';
import './TodoList.scss';
import cn from 'classnames';

export const TodoList = ({ todos, selectUser, deleteTodo }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={cn(`TodoList__item`, {
              'TodoList__item--unchecked': !todo.completed,
            })}
          >
            <label>
              <input type="checkbox" readOnly checked={todo.completed} />
              <p>{todo.title}</p>

              <button
                className="button"
                type="button"
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              >
                X
              </button>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => {
                selectUser(todo.userId);
              }}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
