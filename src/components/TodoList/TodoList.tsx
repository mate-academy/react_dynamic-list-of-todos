import React, { useMemo, useState } from 'react';
import './TodoList.scss';

import { LinearProgress } from '@mui/material';
import classNames from 'classnames';

interface Todo {
  completed: boolean;
  id: number;
  createdAt: string;
  updatedAp: string;
  userId: number;
  title: string;
}

type Props = {
  todos: Todo[];
  selectedUserId: number;
  changeUser: (userId: number) => void;
};

export const TodoList: React.FC<Props>
  = ({ todos, selectedUserId, changeUser }) => {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState('all');
    const [randomArr, setRandomArr] = useState(false);

    const getVisibleTodos = useMemo(() => {
      let newArr = todos.filter(
        todo => todo.title.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()),
      );

      if (randomArr) {
        for (let i = newArr.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));

          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
      }

      switch (sortBy) {
        case 'active':
          newArr = newArr.filter(todo => todo.completed === false);
          break;
        case 'completed':
          newArr = newArr.filter(todo => todo.completed === true);
          break;
        default:
          break;
      }

      return newArr;
    }, [todos, query, sortBy, randomArr]);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        {!todos.length ? (
          <LinearProgress />
        ) : (
          <main>
            <div className="TodoList__filters">
              <input
                className="TodoList__filter TodoList__input"
                type="text"
                value={query}
                placeholder="Type search todo..."
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />

              <select
                className="TodoList__filter TodoList__select"
                defaultValue={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setRandomArr(false);
                }}
              >
                <option value="all">all</option>
                <option value="active">active</option>
                <option value="completed">completed</option>
              </select>

              <button
                className="TodoList__filter TodoList__btn"
                type="button"
                onClick={() => {
                  setRandomArr(!randomArr);
                }}
              >
                {'Randomize '}
                {randomArr ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="TodoList__list-container">
              <ul className="TodoList__list">
                {getVisibleTodos.map(todo => (
                  <li
                    className={classNames('TodoList__item',
                      { 'TodoList__item--unchecked': !todo.completed },
                      { 'TodoList__item--checked': todo.completed })}
                    key={todo.id}
                  >
                    <label>
                      <input type="checkbox" readOnly />
                      <p>{todo.title}</p>
                    </label>

                    {todo.userId === selectedUserId ? (
                      <button
                        className="
                          TodoList__user-button
                          TodoList__user-button--selected
                          button
                        "
                        type="button"
                      >
                        User&nbsp;#
                        {todo.userId}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          changeUser(todo.userId);
                        }}
                        className="
                          TodoList__user-button
                          button
                        "
                        type="button"
                      >
                        User&nbsp;#
                        {todo.userId}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </main>
        )}
      </div>
    );
  };
