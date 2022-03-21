import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectedUserId: number,
  changeUserId: (userId: number) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedUserId,
  changeUserId,
}) => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('');
  const [filterTodos, setFilterTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setFilterTodos(todos.filter(todo => {
      if (todo.title.includes(query.toLowerCase())) {
        switch (option) {
          case 'all':
            return true;

          case 'done':
            return todo.completed;

          case 'active':
            return !todo.completed;

          default:
            return true;
        }
      }

      return false;
    }));
  }, [todos, query, option]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__filter">
        <input
          type="text"
          value={query}
          onChange={event => {
            setQuery(event.target.value);
          }}
        />
        <select
          onChange={(event) => {
            setOption(event.target.value);
          }}
        >
          <option
            value="all"
          >
            ALL
          </option>
          <option
            value="done"
          >
            Done
          </option>
          <option
            value="active"
          >
            Active
          </option>
        </select>
      </div>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filterTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames({
                TodoList__item: true,
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label htmlFor={`${todo.id}`}>
                <input
                  checked={todo.completed}
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames({
                  'TodoList__user-button': true,
                  button: true,
                  'TodoList__user-button--selected': selectedUserId === todo.userId,
                })}
                type="button"
                onClick={() => {
                  changeUserId(todo.userId);
                }}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
