import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import './TodoList.scss';

interface Props {
  todos: Todo[];
  selectedUserId: number;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const debounce = (f: (prevState: string) => void, delay: number) => {
  let timerId: number;

  return (...args: unknown[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

const shuffleTodos = (todos: Todo[]) => {
  const shuffledTodos = [...todos];

  for (let i = shuffledTodos.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledTodos[i], shuffledTodos[j]] = [shuffledTodos[j], shuffledTodos[i]];
  }

  return shuffledTodos;
};

const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  onButtonClick,
}) => {
  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<string>('all');
  const [toRandomize, setToRandomize] = useState<boolean>(false);

  const applyQuery = useCallback(
    debounce(setQuery, 300),
    [],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(event.currentTarget.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.currentTarget.value);
  };

  const preparedTodos = useMemo(() => {
    let resultTodos = todos;

    if (toRandomize) {
      resultTodos = shuffleTodos(resultTodos);
    }

    if (query.length > 0) {
      resultTodos = resultTodos.filter(todo => (
        todo.title.toLowerCase().includes(query.toLowerCase())
      ));
    }

    if (status !== 'all') {
      resultTodos = resultTodos.filter(todo => (
        status === 'completed'
          ? todo.completed
          : !todo.completed
      ));
    }

    return resultTodos;
  }, [todos, query, status, toRandomize]);

  return (
    <div className="TodoList">
      <h2>{status}</h2>

      <div className="TodoList__interactive">
        <input
          type="text"
          placeholder="Title"
          onChange={handleInputChange}
          data-cy="filterByTitle"
        />

        <select onChange={handleSelectChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="button"
          onClick={() => setToRandomize(!toRandomize)}
        >
          Randomize
        </button>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {preparedTodos.map(todo => (
            <li
              className={classNames({
                TodoList__item: true,
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
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
                value={todo.userId}
                className={classNames({
                  button: true,
                  'TodoList__user-button': true,
                  'TodoList__user-button--selected':
                    todo.userId === selectedUserId,
                })}
                type="button"
                onClick={onButtonClick}
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

export default React.memo(TodoList);
