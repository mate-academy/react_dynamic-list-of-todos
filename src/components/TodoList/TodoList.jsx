import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  userId,
  onChange,
  query,
  onSelectInputChange,
  statusSelected,
  onFilterInputChange,
  checkTodo,
}) => (
  <div className="TodoList">
    <div className="TodoList__inputs">
      <div className="TodoList__search-query">
        <label htmlFor="search-query" className="label">
          Search title:
        </label>

        <div className="control">
          <input
            type="text"
            name="query"
            id="search-query"
            className="input"
            placeholder="Type search word"
            value={query}
            onChange={(event) => {
              onFilterInputChange(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="TodoList__select-completed">
        <label htmlFor="select-completed">
          Completed:
          <br />
        </label>

        <select
          name="statusSelected"
          id="select-completed"
          value={statusSelected}
          onChange={(event) => {
            onSelectInputChange(event.target.value);
          }}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
        <br />
      </div>
    </div>

    <h2>Todos:</h2>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'TodoList__item',
              { 'TodoList__item--checked': todo.completed },
              { 'TodoList__item--unchecked': !todo.completed },
            )}
          >
            <label>
              <input
                checked={todo.completed}
                type="checkbox"
                onChange={() => {
                  checkTodo(todo.id);
                }}
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={
                userId
                  ? 'TodoList__user-button--selected button'
                  : 'TodoList__user-button button'
              }
              type="button"
              onClick={() => {
                onChange(todo.userId);
              }}
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
  userId: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
  query: PropTypes.string,
  statusSelected: PropTypes.string,
  onSelectInputChange: PropTypes.func.isRequired,
  onFilterInputChange: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

TodoList.defaultProps = {
  userId: 0,
  query: '',
  statusSelected: '',
};
