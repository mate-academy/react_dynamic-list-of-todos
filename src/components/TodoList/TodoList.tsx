import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import './TodoList.scss';

type Props = {
  selectedUserId: number | null,
  setSelectedUserId: (id: number) => void;
  onShuffle: () => void;
  todos: Todo[],
};

enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  selectedUserId,
  setSelectedUserId,
  onShuffle,
  todos,
}) => {
  const [titleQuery, setTitleQuery] = useState('');
  const [filterByStatus, setFilterByStatus] = useState(Status.All);

  const filteredTodos = todos.filter((todo) => {
    const isQuery = todo.title.toLowerCase()
      .includes(titleQuery.toLowerCase());

    switch (filterByStatus) {
      case Status.All:
        return isQuery;

      case Status.Active:
        return isQuery && !todo.completed;

      case Status.Completed:
        return isQuery && todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__controls">
        <label>
          Search:
          <input
            className="TodoList__inputs"
            type="text"
            value={titleQuery}
            onChange={({ target }) => {
              setTitleQuery(target.value);
            }}
            data-cy="filterByTitle"
          />
        </label>

        <label>
          Show:
          <select
            className="TodoList__inputs"
            value={filterByStatus}
            onChange={({ target }) => {
              setFilterByStatus(target.value as Status);
            }}
          >
            <option value={Status.All}>all</option>
            <option value={Status.Active}>active</option>
            <option value={Status.Completed}>completed</option>
          </select>
        </label>

        <button
          type="button"
          className="button"
          onClick={() => onShuffle()}
        >
          Randomize
        </button>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item ',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>
              {todo.userId && (
                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected':
                        selectedUserId === todo.userId,
                    },
                  )}
                  type="button"
                  onClick={() => setSelectedUserId(todo.userId)}
                  data-cy="userButton"
                >
                  User&nbsp;
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
