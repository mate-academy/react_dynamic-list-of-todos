import React from 'react';
import './TodoList.scss';

export const TodoList = () => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
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
