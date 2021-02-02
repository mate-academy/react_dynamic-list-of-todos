import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';

export const TodoList = ({
  selectUser,
  todos,
  selectedFilter,
  handlerFilterStatus,
  handleInputChange,
  title,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <form action="">
      <input
        type="text"
        name="title"
        value={title}
        onChange={(event) => {
          handleInputChange(event.target.value);
        }}
      />

      <select
        name="selectedFilter"
        value={selectedFilter}
        onChange={(event) => {
          handlerFilterStatus(event.target.value);
        }}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </form>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'TodoList__item',
              todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked',
            )}
          >
            <label>
              <input
                checked={todo.completed}
                type="checkbox"
                readOnly
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
              onClick={() => selectUser(todo.userId)}
            >
              {'user '}
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  title: PropTypes.string.isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  handlerFilterStatus: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
};
