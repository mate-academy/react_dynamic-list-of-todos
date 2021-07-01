import React, { useState } from 'react';
import classNames from 'classnames';

import './TodoList.scss';

import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  onUserIdSelected,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const handleQueryChange = (event) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const visibleTodos = todos
    .filter(todo => todo.title)
    .filter(todo => todo.title.toLowerCase().includes(query))
    .filter((todo) => {
      if (type === 'active') {
        return !todo.completed;
      }

      if (type === 'completed') {
        return todo.completed;
      }

      return todo;
    });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      {'Search: '}
      <input
        type="text"
        value={query}
        placeholder="Enter a title"
        onChange={handleQueryChange}
      />

      <select
        value={type}
        onChange={handleTypeChange}
      >
        <option>Choose todos</option>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(({ id, title, userId, completed }) => (
            <li
              key={id}
              className={classNames('TodoList__item', {
                'TodoList__item--checked': completed,
                'TodoList__item--unchecked': !completed,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  readOnly
                />
                <p>{title}</p>
              </label>

              {userId && (
                <button
                  type="button"
                  onClick={() => {
                    onUserIdSelected(userId);
                  }}
                  className={classNames({
                    'TodoList__user-button': true,
                    button: true,
                    'TodoList__user-button--selected':
                      selectedUserId === userId,
                  })}
                >
                  {`User #${userId}`}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,

  onUserIdSelected: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
