import React from 'react';
import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(item => (
          <li
            className="TodoList__item TodoList__item--unchecked"
            key={item.id}
          >
            <label>
              <input type="checkbox" readOnly />
              <p>{item.title}</p>
            </label>

            <button
              className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
              type="button"
            >
              User&nbsp;#
              {item.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
