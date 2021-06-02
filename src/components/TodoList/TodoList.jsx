import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  onUserSelect,
  selectedUser,
  titleSearch,
  titleSearchChangeHandler,
  setTodosStatus,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div>
        Search by title name
        <input
          className="TodoList__title-search"
          id="title-filter"
          type="text"
          name="titleSearch"
          value={titleSearch}
          onChange={({ target }) => titleSearchChangeHandler(target)}
        />
      </div>

      <div>
        Select todo status
        <select
          name="todo-status"
          id="todo-status"
          className="TodoList__status-select"
          onChange={event => setTodosStatus(event.target.value)}
        >
          <option
            value="All"
          >
            All
          </option>
          <option
            value="Active"
          >
            Active
          </option>
          <option
            value="Completed"
          >
            Completed
          </option>
        </select>
      </div>
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
                onUserSelect(todo.userId);
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })).isRequired,
  selectedUser: PropTypes.number.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  titleSearch: PropTypes.string.isRequired,
  titleSearchChangeHandler: PropTypes.func.isRequired,
  setTodosStatus: PropTypes.func.isRequired,
};
