import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUser: number,
  selectedUserId: (userId: number) => void,
};

enum State {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUser,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [filterState, setFilterState] = useState('');

  const filteredTodos = todos.filter((todo) => {
    const isFiltered = todo.title.toLowerCase()
      .includes(query.toLowerCase());

    switch (filterState) {
      case State.All:
        return isFiltered;

      case State.Active:
        return isFiltered && !todo.completed;

      case State.Completed:
        return isFiltered && todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__filter">
        <label>
          Search:
          <input
            className="TodoList__input"
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </label>

        <label>
          Show:
          <select
            className="TodoList__input"
            value={filterState}
            onChange={(event) => {
              setFilterState(event.target.value);
            }}
          >
            <option value={State.All}>All</option>
            <option value={State.Active}>Active</option>
            <option value={State.Completed}>Completed</option>
          </select>
        </label>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={classNames({
                TodoList__item: true,
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
            >
              <label>
                <input
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                data-cy="userButton"
                onClick={() => {
                  selectedUserId(todo.userId);
                }}
                className={classNames({
                  'TodoList__user-button button': true,
                  'TodoList__user-button--selected':
                    todo.userId === selectedUser,
                })}
                type="button"
              >
                {`User ${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
