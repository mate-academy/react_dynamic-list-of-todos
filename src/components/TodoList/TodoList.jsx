import React from 'react';
import './TodoList.scss';

export const TodoList = ({ todos, selectedUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (

          <li
            key={todo.id}
            className={todo.completed
              ? 'TodoList__item--checked TodoList__item'
              : 'TodoList__item TodoList__item--unchecked'
            }
          >
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
              onClick={() => selectedUser(todo.userId)}
            >
              User&nbsp;#{todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);



