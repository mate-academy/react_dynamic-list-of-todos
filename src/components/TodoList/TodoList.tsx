import classNames from 'classnames';
import React, { useState } from 'react';
import { TodoProps } from '../../types/types';
import './TodoList.scss';

export const TodoList: React.FC<TodoProps> = ({ todos, selectUser, selectedUserId }) => {
  const displayFormat = ['all', 'active', 'completed'];
  const [curentDisplay, setCurrentDisplay] = useState('all');
  const [query, setQuery] = useState('');

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredTodos = (() => {
    const filtredTodo = todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (curentDisplay) {
      case 'active':
        return filtredTodo.filter(todo => !todo.completed);

      case 'completed':
        return filtredTodo.filter(todo => todo.completed);

      default:
        return filtredTodo;
    }
  });

  const displayedTodos = filteredTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          <label htmlFor="select">
            <select
              id="select"
              value={curentDisplay}
              onChange={(event) => {
                setCurrentDisplay(event.target.value);
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
              search(event);
            }}
          />
          {displayedTodos.map(todo => (
            <li
              className={classNames({
                TodoList__item: true,
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
              key={todo.id}
            >
              <input
                type="checkbox"
                readOnly
                checked={todo.completed}
              />

              <p>{todo.title}</p>
              <button
                className={classNames({
                  'TodoList__user-button': true,
                  button: true,
                  'TodoList__user-button--selected': todo.userId === selectedUserId,
                })}
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
      </div>
    </div>
  );
};
