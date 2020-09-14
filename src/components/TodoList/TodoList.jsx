import React from 'react';
import './TodoList.scss';

export const TodoList = ({ todos, selectedFilter, handleSelect }) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <form>
      <label htmlFor="filter">
        Filter
        <input type="text" name="filter" />
      </label>
      <label>
        <select
          onChange={event => handleSelect(event.target.value)}
        >
          <option value="All">
            Choose a type
          </option>
          <option value="Completed">
            Completed
          </option>
          <option value="Not completed">
            Not completed
          </option>
        </select>
      </label>
    </form>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(item => (
          <li
            className="TodoList__item TodoList__item--unchecked"
            key={item.id}
          >
            <label>
              <input type="checkbox" checked={item.completed} />
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
