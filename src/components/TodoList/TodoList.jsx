import React from 'react';
import './TodoList.scss';

export const TodoList = ({ todos, selectUser, selectedUser }) => (
  <div className="TodoList">
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={
              todo.completed
                ? 'TodoList__item TodoList__item--checked'
                : 'TodoList__item TodoList__item--unchecked'
            }
            key={todo.id}
          >
            <label>
              <input type="checkbox" readOnly />
              <p>{todo.title}</p>
            </label>

            <button
              className={
                todo.userId === selectedUser
                  ? `
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    `
                  : 'TodoList__user-button button'
              }
              type="button"
              onClick={() => {
                selectUser(todo.userId);
              }}
            >
              User&nbsp;#{todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
