import React, { useState } from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  onSelectUserId: (userId: number) => void,
  selectedUserId: number,
};

enum Status {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export const TodoList: React.FC<Props> = ({
  todos,
  onSelectUserId,
  selectedUserId,
}) => {
  const [query, setQuery] = useState('');
  const [todosStatus, setTodosStatus] = useState('');
  const [isRandomized, setIsRandomized] = useState(false);

  const filterByTitle = () => {
    return todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
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

  const randomize = (arr: Todo[]) => {
    const arrToShuffle = [...arr];

    for (let i = arrToShuffle.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [arrToShuffle[i], arrToShuffle[j]] = [arrToShuffle[j], arrToShuffle[i]];
    }

    return arrToShuffle;
  };

  const visibleTodos = isRandomized
    ? randomize(preparingTodos())
    : preparingTodos();

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">

        <label>
          Filter by title:
          {' '}
          <input
            data-cy="filterByTitle"
            type="text"
            value={query}
            onChange={(event => setQuery(event.target.value))}
          />
        </label>

        <select
          className="TodoList__select"
          onChange={(event) => {
            setTodosStatus(event.target.value);
          }}
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

        <button
          className="button button--randomize"
          type="button"
          onClick={() => setIsRandomized(prev => !prev)}
        >
          Randomize
        </button>

        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': todo.completed },
                { 'TodoList__item--unchecked': !todo.completed },
              )}
            >
              <label>
                <input type="checkbox" checked readOnly />
                <p>{todo.title}</p>
              </label>

              {todo.userId && (
                <button
                  data-cy="userButton"
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => onSelectUserId(todo.userId)}
                >
                  {`User ${todo.userId}`}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
