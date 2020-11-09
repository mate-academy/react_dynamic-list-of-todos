import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';

export const TodoList = ({
  todos,
  showUser,
  selectedTodoId,
  filterValue,
  selectValue,
  handleChange,
  handleSelect,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__form">
      <input
        type="text"
        name="title"
        value={filterValue}
        placeholder="Choose Todo Title"
        onChange={({ target }) => handleChange(target.value)}
        className="TodoList__input input"
      />
      <select
        name="completed"
        value={selectValue}
        onChange={({ target }) => handleSelect(target.value)}
        className="TodoList__select select"
      >
        <option value="">Filter by status</option>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={
              `TodoList__item
            ${todo.completed
            ? 'TodoList__item--checked'
            : 'TodoList__item--unchecked'}`
            }
          >
            <label>
              <input type="checkbox" />
              <p>{todo.title}</p>
            </label>

            <button
              className={
                `button ${selectedTodoId === todo.id
                  ? 'TodoList__user-button--selected'
                  : 'TodoList__user-button'}`
              }
              type="button"
              onClick={() => showUser(todo.userId, todo.id)}
            >
              {`User ${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      userId: PropTypes.number,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  filterValue: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  showUser: PropTypes.func.isRequired,
  selectedTodoId: PropTypes.number.isRequired,
};
