import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectUser: CallableFunction;
  selectedUserId: number;
};

type FuncArg = (v: string) => void;

const debounce = (f: FuncArg, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  selectedUserId,
}) => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<boolean | undefined>(undefined);
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    setInitialTodos(todos);
  }, [todos]);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 500),
    [],
  );

  const selectStatus = (input: string) => {
    let inputStatus: boolean;

    if (input !== 'all') {
      if (input === 'active') {
        inputStatus = false;
      } else {
        inputStatus = true;
      }

      setStatus(inputStatus);
    } else {
      setStatus(undefined);
    }
  };

  const randomize = (array: Todo[]) => {
    const newArr = [...array];

    for (let i = newArr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    return newArr;
  };

  const randomizer = () => {
    setInitialTodos(randomize(initialTodos));
  };

  let filteredTodos = initialTodos
    .filter(todo => todo.title.includes(appliedQuery));

  if (status !== undefined) {
    filteredTodos = filteredTodos.filter(todo => todo.completed === status);
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__filters">
        <label>
          <input
            data-cy="filterByTitle"
            className="TodoList__input input"
            type="text"
            placeholder="Filter by title"
            onChange={(event) => {
              applyQuery(event.target.value);
            }}
          />
        </label>

        <label>
          <select
            name="select"
            className="TodoList__input select"
            onChange={(event) => selectStatus(event.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <button
          type="button"
          className="button TodoList__input"
          onClick={() => randomizer()}
        >
          Randomize
        </button>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {filteredTodos.map(todo => (
            <>
              <li
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>
                {todo.userId
                  && (
                    <button
                      data-cy="userButton"
                      className={classNames(
                        'TodoList__user-button button',
                        {
                          'TodoList__user-button--selected button':
                            todo.userId === selectedUserId,
                        },
                      )}
                      type="button"
                      onClick={
                        () => {
                          selectUser(todo.userId);
                        }
                      }
                    >
                      {`User ${todo.userId}`}
                    </button>
                  )}
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};
