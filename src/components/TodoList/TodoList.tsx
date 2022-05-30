import React, {
  ChangeEvent,
  useState,
  useCallback,
} from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectUser: (id: number) => void;
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
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [random, setRandom] = useState(false);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const filterTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
    applyQuery(value);
  };

  const changeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setStatus(value);
  };

  const todosForRender = () => {
    const filteredTodos = todos.filter(({ title }) => {
      const changeTitle = title.toLowerCase();

      return changeTitle.includes(appliedQuery.toLowerCase());
    });

    switch (status) {
      case 'Active':
        return filteredTodos.filter(({ completed }) => !completed);

      case 'Completed':
        return filteredTodos.filter(({ completed }) => completed);

      default:
        return filteredTodos;
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

  const readyTodos = todosForRender();
  const renderTodos = random ? randomize(readyTodos) : readyTodos;

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <p>Search by title</p>
      <label>
        <input type="text" value={query} onChange={filterTitle} />
      </label>
      <select
        value={status}
        onChange={changeStatus}
        className="TodoList__select"
      >
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>

      <button
        type="button"
        onClick={() => setRandom(state => !state)}
        className="TodoList__random"
      >
        Randomize
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {renderTodos.map(({
            userId,
            completed,
            title,
            id,
          }) => (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--checked': completed },
                { 'TodoList__item--unchecked': !completed },
              )}
              key={id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{title}</p>
              </label>

              { userId
              && (
                <button
                  data-cy="userButton"
                  className={classNames('TodoList__user-button button', {
                    // eslint-disable-next-line max-len
                    'TodoList__user-button--selected': userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => selectUser(userId)}
                >
                  {`User ${userId}`}
                </button>
              )}

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
