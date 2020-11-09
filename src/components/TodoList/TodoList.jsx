import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export const TodoList = ({
  todos,
  showUser,
  selectedTodoId,
  filterValue,
  selectFilterValue,
  handleFilterQuery,
  handleFilterType,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__form">
      <input
        type="text"
        name="title"
        value={filterValue}
        placeholder="Choose Todo Title"
        onChange={({ target }) => handleFilterQuery(target.value)}
        className="TodoList__input input"
      />
      <select
        name="completed"
        value={selectFilterValue}
        onChange={({ target }) => handleFilterType(target.value)}
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
            className={classNames({
              TodoList__item: true,
              'TodoList__item--checked': todo.completed === true,
              'TodoList__item--unchecked': todo.completed === false,
            })}
          >
            <label>
              <input type="checkbox" />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames({
                button: true,
                'TodoList__user-button--selected': selectedTodoId === todo.id,
                'TodoList__user-button': true,
              })}
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
  selectFilterValue: PropTypes.string.isRequired,
  handleFilterQuery: PropTypes.func.isRequired,
  handleFilterType: PropTypes.func.isRequired,
  showUser: PropTypes.func.isRequired,
  selectedTodoId: PropTypes.number.isRequired,
};
