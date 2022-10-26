/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useState, useEffect, useMemo } from 'react';
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

  const shuffle = (arr: Todo[]): Todo[] => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];

      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  };

  const visibleTodos: Todo[] = useMemo(() => {
    const newTodos = todos
      .filter(todo => todo.title.toLocaleLowerCase().includes(queryLLC))
      .filter(todo => {
        switch (statusFilter) {
          case 'all':
            return todo;

          case 'active':
            return todo.completed === false;

          case 'completed':
            return todo.completed === true;

          default:
            return 0;
        }
      })
      .sort((t1, t2) => t1.id - t2.id);

    if (random) {
      return shuffle(newTodos);
    }

    return newTodos;
  }, [queryLLC, statusFilter, random]);

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
          {visibleTodos.map((todo: Todo) => (
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
                  'TodoList__user-button--selected':
                    selectedUserId === todo.userId,
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
