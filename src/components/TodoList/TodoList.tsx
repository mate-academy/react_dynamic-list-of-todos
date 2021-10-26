import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUserId: (id: number) => void,
  query: string,
  setQuery: (query: string) => void,
  searchedChars: string,
  setChars: (str: string) => void,
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    selectUserId,
    query,
    setQuery,
    searchedChars,
    setChars,
  },
) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      type="text"
      onChange={(event) => setChars(event.currentTarget.value)}
      value={searchedChars}
    />
    <select
      onChange={(event) => setQuery(event.target.value)}
      value={query}
    >
      <option value="all">all</option>
      <option value="active">active</option>
      <option value="completed">completed</option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classnames(
              'TodoList__item',
              todo.completed
                ? 'TodoList__item--checked'
                : 'TodoList__item--unchecked',
            )}
          >
            <label htmlFor="in">
              <input
                id="in"
                type="checkbox"
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classnames(
                'TodoList__user-button',
                'TodoList__user-button--selected',
                'button',
              )}
              type="button"
              onClick={() => selectUserId(todo.userId)}
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
