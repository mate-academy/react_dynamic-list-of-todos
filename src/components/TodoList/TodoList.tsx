/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useMemo, useState, useEffect } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  selectUser: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  selectUser,
}) => {
  const [query, setQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [random, setRandom] = useState<boolean>(false);
  const [queryLLC, setQueryLLC] = useState<string>('');

  useEffect(() => {
    setQueryLLC(query.toLocaleLowerCase());
  }, [query]);

  const visibleTodos = useMemo(() => (
    todos
      .filter(todo => todo.title.toLocaleLowerCase().includes(queryLLC))
      .filter(todo => {
        switch (statusFilter) {
          case 'all':
            return todo;

          case 'active':
            return todo.completed === false;

          case 'completed':
            return todo.completed;

          default:
            return 0;
        }
      })
      .sort((t1, t2) => (
        random
          ? Math.random() - 0.5
          : t1.id - t2.id
      ))
  ), [queryLLC, statusFilter, random]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const randomize = () => {
    setRandom(!random);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <div className="TodoList__item TodoList__item-filters">
          <input
            className="TodoList__item-filters--title"
            type="text"
            name="query"
            placeholder="Enter todo`s title"
            autoComplete="off"
            value={query}
            onChange={handleInput}
            data-cy="filterByTitle"
          />
          <select
            className="TodoList__item-filters--status"
            name="status"
            value={statusFilter}
            onChange={handleSelect}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button
            className={classNames('button TodoList__item-filters--random', {
              'button-active': random,
            })}
            type="button"
            onClick={randomize}
          >
            Randomize
          </button>
        </div>

        <ul className="TodoList__list" data-cy="listOfTodos">
          {visibleTodos.map((todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames('TodoList__user-button button', {
                  'TodoList__user-button--selected': selectedUserId === todo.userId,
                })}
                type="button"
                onClick={() => selectUser(todo.userId)}
                data-cy="userButton"
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
