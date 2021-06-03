import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  onUserId,
  selectedUserId,
  search,
  onSearch,
  onSelect,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <input
        type="text"
        onChange={({ target }) => onSearch(target)}
        placeholder="Filter todos"
        value={search}
      />
      <select
        onChange={event => onSelect(event.target.value)}
      >
        <option
          value="All"
        >
          All
        </option>
        <option
          value="Completed"
        >
          Completed
        </option>
        <option
          value="Active"
        >
          Active
        </option>
      </select>
      <ul>
        {todos.map(todo => (
          <li
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
            key={todo.id}
          >
            <label>
              <input
                type="checkbox"
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames(
                'TodoList__user-button',
                'button', {
                  'TodoList__user-button--selected': todo.userId
                    === selectedUserId,
                },
              )}
              type="button"
              onClick={() => onUserId(todo.userId)}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  onUserId: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
