import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  handleUser,
  search,
  query,
  handleSelect,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <input
      className="TodoList__input ui selection dropdown"
      type="text"
      value={query}
      onChange={search}
    />

    <select
      onChange={handleSelect}
      className="TodoList__select ui selection dropdown"
    >
      <option value="all">all</option>
      <option value="active">active</option>
      <option value="completed">completed</option>
    </select>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={
              `TodoList__item TodoList__item--${
                todo.completed
                  ? 'checked'
                  : 'unchecked'
              }`
            }
          >
            <label>
              <input type="checkbox" checked={todo.completed} readOnly />
              <p>{todo.title}</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              value={todo.userId}
              type="button"
              onClick={handleUser}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  handleUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
}.isRequired;
