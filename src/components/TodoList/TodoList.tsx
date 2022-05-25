import React, { useState } from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  todos: Todo[],
  onSelectUserId: (userId: number) => void,
};

enum Status {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectUserId,
}) => {
  const [query, setQuery] = useState('');
  const [todosStatus, setTodosStatus] = useState('');

  const filterByTitle = () => {
    return todos.filter(todo => {
      return (todo.title.toLowerCase().includes(query.toLowerCase()));
    });
  };

  const preparingTodos = () => {
    const filteredByTitle = filterByTitle();

    if (todosStatus === Status.Completed) {
      return filteredByTitle.filter(todo => todo.completed);
    }

    if (todosStatus === Status.Active) {
      return filteredByTitle.filter(todo => !todo.completed);
    }

    return filteredByTitle;
  };

  const visibleTodos = preparingTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <label>
          Filter:
          {' '}
          <input
            data-cy="filterByTitle"
            type="text"
            value={query}
            onChange={(event => setQuery(event.currentTarget.value))}
          />
        </label>

        <select
          onChange={(event) => {
            setTodosStatus(event.target.value);
          }}
          className="TodoList__select"
        >
          <option value={Status.All}>
            All
          </option>
          <option value={Status.Active}>
            Active
          </option>
          <option value={Status.Completed}>
            Completed
          </option>
        </select>

        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map(todo => (
            <li
              className={classnames({
                TodoList__item: true,
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                data-cy="userButton"
                className="
                TodoList__user-button
                button
              "
                type="button"
                onClick={() => onSelectUserId(todo.userId)}
              >
                User&nbsp;#
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
