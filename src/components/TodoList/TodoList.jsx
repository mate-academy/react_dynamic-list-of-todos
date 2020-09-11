import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';

export const TodoList = ({
  statusFilter,
  handleSelect,
  handleChange,
  todos,
  setUser,
}) => (
  <div className="TodoList">
    <select
      value={statusFilter}
      onChange={handleSelect}
    >
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Not completed">Not completed</option>
    </select>
    <input
      type="text"
      onChange={event => handleChange(event.target.value)}
    />

    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames({
              TodoList__item: true,
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label>
              <input
                type="checkbox"
                readOnly
                checked={todo.completed}
              />
              <p>{todo.title}</p>
            </label>

            <button
              className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
              type="button"
              onClick={() => setUser(todo.userId)}
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
  statusFilter: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
