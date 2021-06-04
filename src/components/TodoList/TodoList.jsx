import React from 'react';
import './TodoList.scss';

import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  filterTodos,
  filterTitle,
  onChangeFilterStatus,
  selectUser,
  selectedUser,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <label>
        Enter a task
        <input
          className="TodoList__title-search"
          type="text"
          value={filterTitle}
          onChange={event => filterTodos(event)}
        />
      </label>

      <label>
        Filter tasks
        <select
          name="TodoList__todo-status"
          className="TodoList__status-select"
          onChange={event => onChangeFilterStatus(event)}
        >
          <option>all</option>

          <option>active</option>

          <option>completed</option>
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
  filterTodos: PropTypes.func.isRequired,
  filterTitle: PropTypes.string.isRequired,
  onChangeFilterStatus: PropTypes.func.isRequired,
  selectedUser: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
