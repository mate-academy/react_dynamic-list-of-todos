import React from 'react';
import './TodoList.scss';

export const TodoList = () => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <ul className="TodoList__list">
      <li className="TodoList__item">
        <label>
          <input type="checkbox" readOnly />
          delectus aut autem
        </label>

        <button type="button">User&nbsp;#1</button>
      </li>

      <li className="TodoList__item">
        <label>
          <input type="checkbox" checked readOnly />
          distinctio vitae autem nihil ut molestias quo
        </label>

        <button type="button">User&nbsp;#2</button>
      </li>
    </ul>
  </div>
);
