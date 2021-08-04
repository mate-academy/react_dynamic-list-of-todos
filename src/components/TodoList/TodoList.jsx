import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export const TodoList = ({
  todos,
  status,
  value,
  filterByCompleteStatus,
  filterByTitle,
  onUserIdSelected,
  selectedUserId,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <p>Filter by title:</p>
    <input
      className="input"
      value={value}
      onChange={filterByTitle}
    />
    <p>Status</p>
    <select
      value={status}
      onChange={filterByCompleteStatus}
    >
      <option value="all">
        all
      </option>
      <option value="completed">
        completed
      </option>
      <option value="in process">
        in process
      </option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames({
              TodoList__item: true,
              'TodoList__item--checked': todo.completed,
              'TodoList__item--unchecked': !todo.completed,
            })}
          >
            <label>
              <input type="checkbox" checked={todo.completed} readOnly />
              <p>{todo.title}</p>
            </label>

            <button
              type="button"
              className={classNames({
                'TodoList__user-button': true,
                button: true,
                'TodoList__user-button--selected':
                  selectedUserId === todo.userId,
              })}
              onClick={() => onUserIdSelected(todo.userId)}
            >
              User&nbsp;#
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  status: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  filterByTitle: PropTypes.func.isRequired,
  filterByCompleteStatus: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onUserIdSelected: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
