import React, { useState } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

import './TodoList.scss';

export const TodoList = ({
  todos,
  selectedUserId,
  selectUser,
}) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const visibleTodos = todos
    .filter(todo => todo.title)
    .filter(todo => todo.title.includes(query))
    .filter(todo =>
      (type === 'completed' ? todo.completed : !todo.completed),
    );

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <select
        name="todoState"
        id="todoState"
        onClick={event => setType(event.target.value)}
      >
        <option
          value=""
          defaultValue
          disabled
        >
          Select state
        </option>
        <option value="completed">Completed</option>
        <option value="active">Active</option>
        <option value="all">All</option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classnames({
                // eslint-disable-next-line quote-props
                'TodoList__item': true,
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>
              {todo.userId && (
              <button
                type="button"
                className={classnames({
                  'TodoList__user-button': true,
                  button: true,
                  'TodoList__user-button--selected':
                  selectedUserId === todo.userId,
                })}
                onClick={() => selectUser(todo.userId)}
              >
                User&nbsp;#
                {todo.userId}
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
  todos: propTypes.arrayOf({
    userId: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  }).isRequired,
  selectedUserId: propTypes.string.isRequired,
  selectUser: propTypes.func.isRequired,
};
