/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getTodos } from '../../API/api';
import './TodoList.scss';

type Props = {
  chooseUser: (userId: number) => void,
  selectedUserId: number,
};

export const TodoList: React.FC<Props> = ({ chooseUser, selectedUserId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState('');
  const [progress, setProgress] = useState(0);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setFetchError(false);
    getTodos()
      .then(setTodos)
      .catch(() => setFetchError(true));
  }, []);

  let visibleTodos = todos.filter(todo => todo.title.includes(filterTodos));

  switch (progress) {
    case 1:
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
      break;
    case 2:
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
      break;
    default: break;
  }

  return (
    fetchError ? (
      <div
        className="TodoList__Error"
      >
        the server is not responding
      </div>
    ) : (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          value={filterTodos}
          placeholder="Search"
          onChange={(event => setFilterTodos(event.target.value))}
        />
        <select
          value={progress}
          onChange={(event) => setProgress(+event.target.value)}
        >
          <option value={0}>Choose progress</option>
          <option value={1}>completed</option>
          <option value={2}>in progress</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (

              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
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
                  className={classNames(
                    {
                      'TodoList__user-button--selected':
                        todo.userId === selectedUserId,
                    },
                    'button',
                  )}
                  type="button"
                  onClick={() => {
                    chooseUser(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};
