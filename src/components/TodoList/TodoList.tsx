import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import './TodoList.scss';

interface TodoListProps {
  todos: Todo[];
  userId: number;
  onSelectUser: (newSelectedUserId: number) => void;
  onSelectCriteria: (criteria: string) => void;
  onSearchTodos: (searchKey: string) => void;
}

export const TodoList: React.FC<TodoListProps> = (
  {
    todos,
    userId,
    onSelectUser,
    onSelectCriteria,
    onSearchTodos,
  },
) => {
  const [query, setQuery] = useState('');

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        className="TodoList__search-box"
        placeholder="Type search string"
        value={query}
        type="text"
        data-cy="filterByTitle"
        onChange={(event) => {
          setQuery(event.target.value);
          onSearchTodos(query);
        }}
      />

      <select
        className="TodoList__filter-box"
        name="criteria"
        id="criteria"
        onChange={(event) => onSelectCriteria(event.target.value)}
      >
        <option
          value="all"
        >
          All
        </option>
        <option
          value="active"
        >
          Active
        </option>
        <option
          value="completed"
        >
          Completed
        </option>
      </select>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {
            todos.map(todo => (
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
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  data-cy="userButton"
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected': userId === todo.userId,
                    },
                  )}
                  type="button"
                  onClick={() => onSelectUser(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
