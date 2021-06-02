import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  userId,
  selectUser,
  handleChange,
  filter,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <input
      type="text"
      id="search-query"
      name="query"
      className="input"
      placeholder="Type search word"
      onChange={handleChange}
    />

    <select
      onChange={handleChange}
      name="filter"
      value={filter}
    >
      <option name="filter" value="all">All</option>
      <option name="filter" value="active">Active</option>
      <option name="filter" value="completed">Completed</option>
    </select>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`
              TodoList__item
              ${todo.completed
              ? 'TodoList__item--checked'
              : 'TodoList__item--unchecked'
              }
            `}
          >
            <label>
              <input type="checkbox" checked={todo.completed} />
              <p>{todo.title}</p>
            </label>
            {todo.userId === userId ? (
              <button
                className="button TodoList__user-button--selected"
                type="button"
                onClick={() => {
                  selectUser(0);
                }}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            ) : (
              <button
                className="button TodoList__user-button"
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            )
              }
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf().isRequired,
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
