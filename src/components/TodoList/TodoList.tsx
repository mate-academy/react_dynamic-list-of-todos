import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './TodoList.scss';

interface Props {
  listOfTodos : Todo[],
  callbackForUserSelect: (id : number) => void;
}

export const TodoList: React.FC<Props> = (
  { listOfTodos, callbackForUserSelect },
) => {
  const [currentFilter, setCurrentFilter] = useState('');
  const [filterBySelect, setFilterBySelect] = useState('all');
  const [filtered, setFiltered] = useState<Todo[]>([]);

  function sorter(list : Todo[]) {
    switch (filterBySelect) {
      case 'completed': {
        return list.filter(el => el.completed === true);
      }

      case 'active': {
        return list.filter(el => el.completed === false);
      }

      default: {
        return list;
      }
    }
  }

  const filtrato = (option : string) => {
    const sorted = listOfTodos.filter(el => el.title.includes(option));
    const result = sorter(sorted);

    setFiltered(result);
  };

  useEffect(() => {
    filtrato(currentFilter);
  }, [filterBySelect, currentFilter, listOfTodos]);

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
            setFilterBySelect(event.target.value);
          }}
        >
          <option value="all">
            all
          </option>
          <option value="completed">
            completed
          </option>
          <option value="active">
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
                  className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
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
