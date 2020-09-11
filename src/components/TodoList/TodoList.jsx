import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export const TodoList = ({
  todos,
  setQuery,
  selectTodos,
  selectUser,
  onChecked,
}) => (

  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      type="text"
      className="TodoList__search"
      placeholder="Find todo by title"
      onChange={event => setQuery(event.target.value)}
    />

    <select
      className="TodoList__select"
      onChange={event => selectTodos(event.target.value)}
    >
      <option value="all">All todos</option>
      <option value="active">Active todos</option>
      <option value="completed">Completed todos</option>
    </select>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={classNames(
              'TodoList__item',
              {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              },
            )}
            key={todo.id}
          >
            <label>
              <input
                type="checkbox"
                readOnly
                checked={todo.completed}
                onChange={() => onChecked(todo.id)}
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
              {`User#${todo.userId}`}
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
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  setQuery: PropTypes.func.isRequired,
  selectTodos: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
};
