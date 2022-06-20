import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './TodoList.scss';

interface Props {
  listOfTodos : Todo[],
  selectedUserId: number,
  callbackForUserSelect: (id : number) => void;
}

export const TodoList: React.FC<Props> = (
  { listOfTodos, callbackForUserSelect, selectedUserId },
) => {
  enum SelectFilter {
    active,
    completed,
    all,
  }

  const [currentFilter, setCurrentFilter] = useState('');
  const [
    filterBySelect, setFilterBySelect,
  ] = useState<SelectFilter>(SelectFilter.all);
  const [filtered, setFiltered] = useState<Todo[]>([]);

  function sorter(list : Todo[]) {
    switch (filterBySelect) {
      case SelectFilter.completed: {
        return list.filter(el => el.completed === true);
      }

      case SelectFilter.active: {
        return list.filter(el => el.completed === false);
      }

      default: {
        return list;
      }
    }
  }

  const filtrato = (option : string) => {
    const sorted = listOfTodos.filter(
      el => el.title.toLowerCase().includes(option.toLowerCase()),
    );
    const result = sorter(sorted);

    setFiltered(result);
  };

  useEffect(() => {
    filtrato(currentFilter);
  }, [filterBySelect, currentFilter, listOfTodos, selectedUserId]);

  return (
    <div className="TodoList">
      <h2>Filter todos:</h2>
      <label>
        <p>filter</p>
        <input
          type="text"
          onChange={(event) => {
            setCurrentFilter(event.target.value);
          }}
        />
      </label>
      <label>
        <p>
          Status
        </p>
        <select
          onChange={(event) => {
            setFilterBySelect(Number(event.target.value));
          }}
        >
          <option value={SelectFilter.all}>
            all
          </option>
          <option value={SelectFilter.completed}>
            completed
          </option>
          <option value={SelectFilter.active}>
            active
          </option>
        </select>
      </label>

      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filtered.map(singleTodo => (
            (
              <li
                key={singleTodo.id}
                className={
                  classNames(
                    'TodoList__item',
                    { 'TodoList__item--checked': singleTodo.completed },
                    { 'TodoList__item--unchecked': !singleTodo.completed },
                  )
                }
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={singleTodo.completed}
                  />
                  <p>{singleTodo.title}</p>
                </label>
                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      // eslint-disable-next-line max-len
                      'TodoList__user-button--selected': singleTodo.userId === selectedUserId,
                    },
                  )}
                  type="button"
                  onClick={() => {
                    callbackForUserSelect(singleTodo.userId);
                  }}
                >
                  {`User ${singleTodo.userId}`}
                </button>
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};
