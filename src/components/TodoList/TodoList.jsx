import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export const TodoList = ({ todos, onUser, onSearch, onFilter }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <input
        type="text"
        name="filter"
        placeholder="find your todo"
        onChange={event => onSearch(event.target.value)}
      />

      <select
        name="filter"
        onChange={event => onFilter(event.target.value)}
      >
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="active">Active</option>
      </select>

      <ul className="TodoList__list">
        {todos.map(({ title, completed, userId }) => (
          <li
            className={classNames({
              TodoList__item: true,
              'TodoList__item--unchecked': !completed,
              'TodoList__item--checked': completed,
            })}
          >
            <label>
              <input type="checkbox" checked={completed} readOnly />
              <p>{title}</p>
            </label>

            <button
              className={classNames({
                'TodoList__user-button': true,
                'TodoList__user-button--selected': !completed,
                button: true,
              })}
              type="button"
              onClick={() => onUser(userId)}
            >
              User&nbsp;#
              {userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  onUser: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};
