import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getTodo } from '../../api/api';
import { Todo } from '../../react-app-env';

import './TodoList.scss';

type Props = {
  onUserIdChange: (userId: number) => void,
};

export const TodoList: React.FC<Props> = ({ onUserIdChange }) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [query, setQuery] = useState('');
  const [filterByStatus, setFilterByStatus] = useState('all');

  useEffect(() => {
    getTodo().then(todo => setTodos(todo));
  }, []);

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByStatus(event.target.value);
  };

  // const randomize = (array: Todo[]) => {
  //   const randomizerArray = array;
  //   let currentIndex = randomizerArray.length;
  //   let randomIndex;

  //   while (currentIndex !== 0) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;

  //     [randomizerArray[currentIndex], randomizerArray[randomIndex]]
  //     = [randomizerArray[randomIndex], randomizerArray[currentIndex]];
  //   }

  //   return randomizerArray;
  // };

  let visibleTodos = todos;

  if (query.length) {
    visibleTodos = visibleTodos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (filterByStatus !== 'all') {
    visibleTodos = visibleTodos.filter(todo => {
      switch (filterByStatus) {
        case 'active':
          return todo.completed === false;

        case 'completed':
          return todo.completed === true;

        default:
          return todo;
      }
    });
  }

  const shuffle = () => {
    visibleTodos = visibleTodos.sort(() => 0.5 - Math.random());
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
          onChange={handleQueryChange}
        />

        <select
          className="form-select"
          aria-label="Default select example"
          value={filterByStatus}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="button"
          onClick={shuffle}
        >
          Randomize
        </button>

        <ul data-cy="listOfTodos" className="TodoList__list">
          {visibleTodos.map(todo => (
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
                  if (todo.userId) {
                    onUserIdChange(todo.userId);
                  }
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
};
