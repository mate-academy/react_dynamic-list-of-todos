import classNames from 'classnames';
import React from 'react';
import { TodoProps } from '../../types/types';
import './TodoList.scss';

export const TodoList: React.FC<TodoProps> = ({
  todos,
  selectUser,
  search,
  selectedUserId,
  display,
  curentDisplay,
  loading,
}) => {
  const displayFormat = ['all', 'active', 'completed'];

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        {loading ? (
          <p>
            loading...
          </p>
        ) : (
          <ul className="TodoList__list">
            <label htmlFor="select">
              <select
                id="select"
                value={curentDisplay}
                onChange={(event) => {
                  display(event.target.value);
                }}
              >
                {displayFormat.map(format => (
                  <option
                    key={format}
                    value={format}
                  >
                    {format}
                  </option>
                ))}
              </select>
            </label>
            <input
              type="text"
              onChange={(event) => {
                search(event.target.value);
              }}
            />
            {todos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
                key={todo.id}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />

                <p>{todo.title}</p>
                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected': todo.userId === selectedUserId,
                    },
                  )}
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User #
                  {' '}
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
