import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { getTodo } from '../../api/api';
import { Todo } from '../../react-app-env';

import './TodoList.scss';

type Props = {
  onUserIdChange: (userId: number) => void,
};

export const TodoList: React.FC<Props> = React.memo(({ onUserIdChange }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [query, setQuery] = useState('');
  const [filterByStatus, setFilterByStatus] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    getTodo().then(todo => {
      setTodos(todo);
      setVisibleTodos(todo);
    });
  }, []);

  const onFilteringByQuery = () => {
    if (visibleTodos === null) {
      setTodos(null);
    } else {
      setTodos([...visibleTodos].filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      ));
    }
  };

  const onFilteringByStatus = () => {
    if (visibleTodos === null) {
      setTodos(null);
    } else {
      setTodos([...visibleTodos].filter(todo => {
        switch (filterByStatus) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return todo;
        }
      }));
    }
  };

  const handleQueryChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  }, []);

  const handleFilterChange = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilterByStatus(event.target.value);
  }, []);

  const handleUserIdChange = (todo: Todo) => {
    if (todo.userId) {
      onUserIdChange(todo.userId);
    }
  };

  const randomize = () => {
    if (todos !== null) {
      const randomizedArray = [...todos];
      let currentIndex = randomizedArray.length;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        [randomizedArray[currentIndex], randomizedArray[randomIndex]]
          = [randomizedArray[randomIndex], randomizedArray[currentIndex]];
      }

      setTodos(randomizedArray);
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          data-cy="filterByTitle"
          className="form-control"
          type="text"
          value={query}
          placeholder="Type search word"
          onChange={(event) => {
            handleQueryChange(event);
            onFilteringByQuery();
          }}
        />

        <select
          className="form-select"
          aria-label="Default select example"
          value={filterByStatus}
          onChange={(event) => {
            handleFilterChange(event);
            onFilteringByStatus();
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="button"
          onClick={randomize}
          className="btn btn-light"
        >
          Randomize
        </button>

        <ul data-cy="listOfTodos" className="TodoList__list">
          {visibleTodos?.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
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
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => {
                  handleUserIdChange(todo);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
