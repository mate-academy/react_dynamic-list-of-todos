// import { checkPropTypes } from 'prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import './TodoList.scss';

export const TodoList = ({
  todos,
  onUserSelect,
  selectedUser,
  handleChangeTitle,
  titleSearch,
  setStatus,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__list-container">
      <p>Search by title name:</p>
      <input
        type="text"
        id="search=query"
        name="titleSearch"
        value={titleSearch}
        onChange={({ target }) => handleChangeTitle(target)}
      />
      <p>Select todo status:</p>
      <select
        onChange={event => setStatus(event.target.value)}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>

      </select>

      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={
              todo.completed
                ? 'TodoList__item TodoList__item--checked'
                : 'TodoList__item TodoList__item--unchecked'
            }
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
              onClick={() => onUserSelect(todo.userId)}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })).isRequired,
  onUserSelect: PropTypes.func.isRequired,
  selectedUser: PropTypes.number.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  titleSearch: PropTypes.string.isRequired,
  setStatus: PropTypes.string.isRequired,
};
