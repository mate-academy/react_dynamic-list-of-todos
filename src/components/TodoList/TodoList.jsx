import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  titleFilter,
  selectedUser,
  selectUser,
  setTodosStatus,
  titleFilterChangeHandler,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <label htmlFor="title-filter" className="TodoList__input-label">
        Search by title name
        <input
          className="TodoList__title-search"
          id="title-filter"
          type="text"
          name="titleFilter"
          value={titleFilter}
          onChange={({ target }) => titleFilterChangeHandler(target)}
        />
      </label>

      <label htmlFor="todo-status" className="TodoList__input-label">
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
      </label>

      <ul className="TodoList__list">
        {todos.map(({ id, title, completed, userId }) => (
          <li
            key={id}
            className={
              completed
                ? 'TodoList__item TodoList__item--checked'
                : 'TodoList__item TodoList__item--unchecked'
            }
          >
            <label>
              <input
                type="checkbox"
                checked={completed}
                readOnly
              />
              <p>{title}</p>
            </label>

            <button
              className={
                userId === selectedUser
                  ? `
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    `
                  : 'TodoList__user-button button'
              }
              type="button"
              onClick={() => {
                selectUser(userId);
              }}
            >
              {`User: #${userId}`}
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
  titleFilter: PropTypes.string.isRequired,
  selectedUser: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  setTodosStatus: PropTypes.func.isRequired,
  titleFilterChangeHandler: PropTypes.func.isRequired,
};
