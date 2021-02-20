import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos,
  selectUser,
  selectedUserId,
  query,
  todoStatus,
  handleChange }) => (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">

        <div className="TodoList__labels">
          <label
            htmlFor="search-query"
            className="TodoList__labelForInput"
          >
            Search todo title
          </label>
          <label
            htmlFor="select-status"
            className="TodoList__labelForSelect"
          >
            Sort by todo status:
          </label>
        </div>

        <div className="TodoList__searchTodos">
          <input
            type="text"
            name="query"
            value={query}
            id="search-query"
            placeholder="Type search word"
            onChange={handleChange}
          />

          <select
            className="TodoList__select"
            name="todoStatus"
            value={todoStatus}
            id="select-status"
            onChange={handleChange}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </div>

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
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className={
                selectedUserId === todo.userId
                  ? 'TodoList__user-button--selected button'
                  : 'TodoList__user-button button'
              }
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                User
                &nbsp;
                #
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
);

TodoList.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  todoStatus: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
};
